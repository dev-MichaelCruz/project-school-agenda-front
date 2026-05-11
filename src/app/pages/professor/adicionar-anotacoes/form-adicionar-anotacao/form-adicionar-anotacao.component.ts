import {
  Component,
  output,
  signal,
  inject,
  input
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-form-adicionar-anotacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-adicionar-anotacao.component.html',
  styleUrl: './form-adicionar-anotacao.component.scss'
})
export class FormAdicionarAnotacaoComponent {

  titulo = input('Adicionar anotação');

  mostrarPrivado = input(true);

  salvar = output<{
    texto: string;
    privado: boolean;
    imagem: File | null;
  }>();

  voltar = output<void>();

  private fb = inject(FormBuilder);

  imagemSelecionada = signal<File | null>(null);
  nomeImagem = signal('');

  form = this.fb.nonNullable.group({
    texto: ['', Validators.required],
    privado: [false]
  });

  abrirSeletor(input: HTMLInputElement): void {
    input.click();
  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    this.imagemSelecionada.set(file);
    this.nomeImagem.set(file.name);
  }

  enviar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvar.emit({
      texto: this.form.getRawValue().texto,
      privado: this.mostrarPrivado()
        ? this.form.getRawValue().privado
        : false,
      imagem: this.imagemSelecionada()
    });

    this.form.reset({
      texto: '',
      privado: false
    });

    this.imagemSelecionada.set(null);
    this.nomeImagem.set('');
  }
}