import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timeout, TimeoutError } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ListToolbar } from '../../../components/list-toolbar/list-toolbar';
import { DataFeedback } from '../../../components/data-feedback/data-feedback';
import { DATA_LOAD_TIMEOUT_MS, DataLoadState } from '../../../utils/data-load-state';
import { matchesSearch } from '../../../utils/search';

import { TeacherResponseDTO } from '../../../models/teacher.dto';
import { TeachersService } from '../../../services/teachers/teachers.service';
import { AccessibleModal } from '../../../directives/accessible-modal';
import { focusMainHeading } from '../../../utils/focus-management';

declare const bootstrap: any;

@Component({
  selector: 'app-deletar-professor',
  standalone: true,
  imports: [CommonModule, ListToolbar, DataFeedback, AccessibleModal],
  templateUrl: './deletar-professor.html',
  styleUrl: './deletar-professor.scss',
})
export class DeletarProfessor implements OnInit {
  private professorService = inject(TeachersService);
  private destroyRef = inject(DestroyRef);

  estadoDados = signal<DataLoadState>('idle');

  professores: TeacherResponseDTO[] = [];
  busca = '';

  get professoresFiltrados(): TeacherResponseDTO[] {
    return this.professores.filter((professor) => matchesSearch(professor.name, this.busca));
  }

  professorSelecionado: TeacherResponseDTO | null = null;

  toastVisivel = false;

  toastMensagem = '';
  erroExclusao = signal('');

  fecharMensagem(): void {
    this.toastVisivel = false;
    focusMainHeading();
  }

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores(): void {
    if (this.estadoDados() === 'loading') return;

    this.estadoDados.set('loading');

    this.professorService.listarProfessores().pipe(
      timeout(DATA_LOAD_TIMEOUT_MS),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (res) => {
        this.professores = res ?? [];
        this.estadoDados.set('loaded');
      },

      error: (err) => {
        this.estadoDados.set(err instanceof TimeoutError ? 'timeout' : 'error');
      },
    });
  }

  abrirModal(professor: TeacherResponseDTO): void {
    this.erroExclusao.set('');
    this.professorSelecionado = professor;

    const modalElement = document.getElementById('modalDeleteProfessor');

    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);

    modal.show();
  }

  confirmarDelete(): void {
    if (!this.professorSelecionado) return;

    const nome = this.professorSelecionado.name;

    this.professorService.deletarProfessor(this.professorSelecionado.teacherId).subscribe({
      next: () => {
        this.professores = this.professores.filter(
          (item) => item.teacherId !== this.professorSelecionado?.teacherId,
        );

        const modalElement = document.getElementById('modalDeleteProfessor');

        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);

          modal?.hide();
        }

        this.toastMensagem = `O professor ${nome} foi deletado com sucesso`;

        this.toastVisivel = true;

      },

      error: (err) => {
        console.error(err);

        let mensagem = 'Erro ao deletar professor.';

        if (typeof err?.error === 'string') {
          mensagem = err.error;
        } else if (err?.error?.message) {
          mensagem = err.error.message;
        }

        this.erroExclusao.set(mensagem);
      },
    });
  }
}
