import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-gerenciar-turmas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './gerenciar-turmas.html',
  styleUrl: './gerenciar-turmas.scss'
})
export class GerenciarTurmas {

  private fb = new FormBuilder();

  turmas = signal<string[]>([
    'Maternal A',
    'Maternal B',
    'Jardim 1',
    'Jardim 2',
    '1º Ano A'
  ]);

  submitted = signal(false);

  turmaIndexSelecionado = signal<number | null>(null);

  form = this.fb.group({
    turma: ['', Validators.required]
  });

  cadastrar(): void {

    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nome = this.form.getRawValue().turma?.trim();

    if (!nome) return;

    this.turmas.update(lista => [...lista, nome]);

    this.form.reset();
    this.submitted.set(false);
  }

  abrirModalExcluir(index: number): void {

    this.turmaIndexSelecionado.set(index);

    const modal = new bootstrap.Modal(
      document.getElementById('modalExcluirTurma')
    );

    modal.show();
  }

  confirmarExclusao(): void {

    const index = this.turmaIndexSelecionado();

    if (index === null) return;

    this.turmas.update(lista =>
      lista.filter((_, i) => i !== index)
    );

    this.turmaIndexSelecionado.set(null);

    const modalEl = document.getElementById('modalExcluirTurma');
    const modal = bootstrap.Modal.getInstance(modalEl);

    modal.hide();
  }

}