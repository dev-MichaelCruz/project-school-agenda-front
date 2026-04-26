import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-deletar-professor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deletar-professor.html',
  styleUrl: './deletar-professor.scss',
})
export class DeletarProfessor {

  professores = [
    { id: 1, nome: 'Carlos Silva' },
    { id: 2, nome: 'Fernanda Souza' },
    { id: 3, nome: 'João Pereira' },
  ];

  professorSelecionado: any = null;

  toastVisivel = false;
  toastMensagem = '';

  abrirModal(professor: any): void {
    this.professorSelecionado = professor;

    const modalElement = document.getElementById('modalDeleteProfessor');

    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);

    modal.show();
  }

  confirmarDelete(): void {

    if (!this.professorSelecionado) return;

    const nome = this.professorSelecionado.nome;

    setTimeout(() => {

      this.professores = this.professores.filter(
        item => item.id !== this.professorSelecionado.id
      );

      const modalElement =
        document.getElementById('modalDeleteProfessor');

      if (modalElement) {
        const modal =
          bootstrap.Modal.getInstance(modalElement);

        modal?.hide();
      }

      this.toastMensagem =
        `O professor ${nome} foi deletado com sucesso`;

      this.toastVisivel = true;

      setTimeout(() => {
        this.toastVisivel = false;
      }, 3000);

    }, 800);

  }

}
