import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-professor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-professor.html',
  styleUrl: './cadastrar-professor.scss'
})
export class CadastrarProfessor {

  private fb = inject(FormBuilder);

  sucesso = false;

  turmasMockadas = [
    { id: 1, nome: 'Maternal A' },
    { id: 2, nome: 'Maternal B' },
    { id: 3, nome: 'Jardim 1' },
    { id: 4, nome: 'Jardim 2' },
    { id: 5, nome: '1º Ano A' },
    { id: 6, nome: '1º Ano B' },
  ];

  form = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    turmas: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  });

  get turmas(): FormArray {
    return this.form.get('turmas') as FormArray;
  }

  adicionarTurma(): void {
    this.turmas.push(
      this.fb.control('', Validators.required)
    );
  }

  removerTurma(index: number): void {
    if (this.turmas.length > 1) {
      this.turmas.removeAt(index);
    }
  }

  cadastrar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);

    this.sucesso = true;

    setTimeout(() => {
      this.sucesso = false;
    }, 3000);

    this.form.reset();

    this.turmas.clear();

    this.turmas.push(
      this.fb.control('', Validators.required)
    );
  }

}
