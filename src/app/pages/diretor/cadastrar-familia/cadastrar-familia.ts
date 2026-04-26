import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-familia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-familia.html',
  styleUrl: './cadastrar-familia.scss',
})
export class CadastrarFamilia {
  private fb = inject(FormBuilder);

  toastVisivel = false;
  toastMensagem = '';

  form = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],

    criancas: this.fb.array([this.criarCrianca()]),
  });

  get criancas(): FormArray {
    return this.form.get('criancas') as FormArray;
  }

  criarCrianca() {
    return this.fb.group({
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      nascimento: ['', Validators.required],
      turma: ['', Validators.required],
    });
  }

  adicionarCrianca(): void {
    this.criancas.push(this.criarCrianca());
  }

  removerCrianca(index: number): void {
    if (this.criancas.length > 1) {
      this.criancas.removeAt(index);
    }
  }

  cadastrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);

    this.toastMensagem = 'Família cadastrada com sucesso';

    this.toastVisivel = true;

    setTimeout(() => {
      this.toastVisivel = false;
    }, 3000);

    this.form.reset();

    this.criancas.clear();
    this.criancas.push(this.criarCrianca());
  }
}
