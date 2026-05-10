import { CommonModule } from '@angular/common';

import { Component, inject, OnInit, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Classroom } from '../../../models/classrooms.dto';

import { ClassroomsService } from '../../../services/classrooms/classrooms.service';

declare var bootstrap: any;

@Component({
  selector: 'app-gerenciar-turmas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gerenciar-turmas.html',
  styleUrl: './gerenciar-turmas.scss',
})
export class GerenciarTurmas implements OnInit {
  private fb = inject(FormBuilder);

  private classroomsService = inject(ClassroomsService);

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
    this.classroomsService.getAllClassrooms().subscribe({
      next: (res) => {
        this.turmas.set(res);
      },

      error: (err) => {
        console.error(err);

        this.abrirModalMensagem('Erro ao carregar turmas.');
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
