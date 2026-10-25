import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ListToolbar } from '../../../components/list-toolbar/list-toolbar';
import { matchesSearch } from '../../../utils/search';

import { TeacherResponseDTO } from '../../../models/teacher.dto';
import { TeachersService } from '../../../services/teachers/teachers.service';

declare const bootstrap: any;

@Component({
  selector: 'app-deletar-professor',
  standalone: true,
  imports: [CommonModule, ListToolbar],
  templateUrl: './deletar-professor.html',
  styleUrl: './deletar-professor.scss',
})
export class DeletarProfessor implements OnInit {
  private professorService = inject(TeachersService);

  professores: TeacherResponseDTO[] = [];
  busca = '';

  get professoresFiltrados(): TeacherResponseDTO[] {
    return this.professores.filter((professor) => matchesSearch(professor.name, this.busca));
  }

  professorSelecionado: TeacherResponseDTO | null = null;

  toastVisivel = false;

  toastMensagem = '';

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores(): void {
    this.professorService.listarProfessores().subscribe({
      next: (res) => {
        this.professores = res;
      },

      error: (err) => {
        console.error(err);

        this.toastMensagem = 'Erro ao carregar professores.';

        this.toastVisivel = true;

        setTimeout(() => {
          this.toastVisivel = false;
        }, 3000);
      },
    });
  }

  abrirModal(professor: TeacherResponseDTO): void {
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

        setTimeout(() => {
          this.toastVisivel = false;
        }, 3000);
      },

      error: (err) => {
        console.error(err);

        let mensagem = 'Erro ao deletar professor.';

        if (typeof err?.error === 'string') {
          mensagem = err.error;
        } else if (err?.error?.message) {
          mensagem = err.error.message;
        }

        this.toastMensagem = mensagem;

        this.toastVisivel = true;

        setTimeout(() => {
          this.toastVisivel = false;
        }, 3000);
      },
    });
  }
}
