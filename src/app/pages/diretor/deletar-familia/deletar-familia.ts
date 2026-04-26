import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-deletar-familia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deletar-familia.html',
  styleUrl: './deletar-familia.scss',
})
export class DeletarFamilia {

  familias = [
    { id: 1, nome: 'Família 1' },
    { id: 2, nome: 'Família 2' },
    { id: 3, nome: 'Família 3' },
  ];

  familiaSelecionada: any = null;

  toastVisivel = false;
  toastMensagem = '';

  abrirModal(familia: any): void {
    this.familiaSelecionada = familia;

    const modalElement = document.getElementById('modalDeleteFamilia');

    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);

    modal.show();
  }

  confirmarDelete(): void {

    if (!this.familiaSelecionada) return;

    const nome = this.familiaSelecionada.nome;

    setTimeout(() => {

      this.familias = this.familias.filter(
        item => item.id !== this.familiaSelecionada.id
      );

      const modalElement = document.getElementById('modalDeleteFamilia');

      if (modalElement) {
        const modal =
          bootstrap.Modal.getInstance(modalElement);

        modal?.hide();
      }

      this.toastMensagem =
        `A ${nome} foi deletada com sucesso`;

      this.toastVisivel = true;

      setTimeout(() => {
        this.toastVisivel = false;
      }, 3000);

    }, 800);

  }

}
