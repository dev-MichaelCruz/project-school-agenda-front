import { CommonModule } from '@angular/common';

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timeout, TimeoutError } from 'rxjs';
import { DataFeedback } from '../../../components/data-feedback/data-feedback';
import { DATA_LOAD_TIMEOUT_MS, DataLoadState } from '../../../utils/data-load-state';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Classroom } from '../../../models/classrooms.dto';

import { ClassroomsService } from '../../../services/classrooms/classrooms.service';

declare var bootstrap: any;

@Component({
  selector: 'app-gerenciar-turmas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataFeedback],
  templateUrl: './gerenciar-turmas.html',
  styleUrl: './gerenciar-turmas.scss',
})
export class GerenciarTurmas implements OnInit {
  private fb = inject(FormBuilder);

  private classroomsService = inject(ClassroomsService);
  private destroyRef = inject(DestroyRef);

  estadoDados = signal<DataLoadState>('idle');

  turmas = signal<Classroom[]>([]);

  submitted = signal(false);

  turmaSelecionada = signal<Classroom | null>(null);

  modalMensagem = '';

  form = this.fb.group({
    turma: ['', Validators.required],
  });

  ngOnInit(): void {
    this.carregarTurmas();
  }

  carregarTurmas(): void {
    if (this.estadoDados() === 'loading') return;

    this.estadoDados.set('loading');

    this.classroomsService.getAllClassrooms().pipe(
      timeout(DATA_LOAD_TIMEOUT_MS),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (res) => {
        this.turmas.set(res);
        this.estadoDados.set('loaded');
      },

      error: (err) => {
        this.estadoDados.set(err instanceof TimeoutError ? 'timeout' : 'error');
      },
    });
  }

  cadastrar(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nome = this.form.getRawValue().turma?.trim();

    if (!nome) return;

    this.classroomsService.cadastrarTurma(nome).subscribe({
      next: () => {
        this.carregarTurmas();

        this.form.reset();

        this.submitted.set(false);

        this.abrirModalMensagem('Turma cadastrada com sucesso.');
      },

      error: (error) => {
        console.error(error);

        let mensagem = 'Erro ao cadastrar turma.';

        if (typeof error?.error === 'string') {
          mensagem = error.error;
        }

        this.abrirModalMensagem(mensagem);
      },
    });
  }

  abrirModalExcluir(turma: Classroom): void {
    this.turmaSelecionada.set(turma);

    const modal = new bootstrap.Modal(document.getElementById('modalExcluirTurma'));

    modal.show();
  }

  confirmarExclusao(): void {
    const turma = this.turmaSelecionada();

    if (!turma) return;

    this.classroomsService.deletarTurma(turma.id).subscribe({
      next: () => {
        this.turmas.update((lista) => lista.filter((item) => item.id !== turma.id));

        this.fecharModalExcluir();

        this.abrirModalMensagem('Turma deletada com sucesso.');
      },

      error: (error) => {
        console.error(error);

        let mensagem = 'Erro ao deletar turma.';

        if (typeof error?.error === 'string') {
          mensagem = error.error;
        }

        this.fecharModalExcluir();

        this.abrirModalMensagem(mensagem);
      },
    });
  }

  fecharModalExcluir(): void {
    const modalEl = document.getElementById('modalExcluirTurma');

    const modal = bootstrap.Modal.getInstance(modalEl);

    modal?.hide();
  }

  abrirModalMensagem(mensagem: string): void {
    this.modalMensagem = mensagem;

    const modal = new bootstrap.Modal(document.getElementById('modalMensagemTurma'));

    modal.show();
  }
}
