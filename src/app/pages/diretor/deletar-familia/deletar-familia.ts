import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FamilyService } from '../../../services/family/family.service';

import { FamilyResponseDTO } from '../../../models/family.dto';

declare const bootstrap: any;

@Component({
  selector: 'app-deletar-familia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deletar-familia.html',
  styleUrl: './deletar-familia.scss',
})
export class DeletarFamilia implements OnInit {
  private familyService = inject(FamilyService);

  familias: FamilyResponseDTO[] = [];

  familiaSelecionada: FamilyResponseDTO | null = null;

  toastVisivel = false;

  toastMensagem = '';

  ngOnInit(): void {
    this.carregarFamilias();
  }

  carregarFamilias(): void {
    this.familyService.listarFamilias().subscribe({
      next: (res) => {
        this.familias = res;
      },

      error: (err) => {
        console.error(err);

        this.toastMensagem = 'Erro ao carregar famílias.';

        this.toastVisivel = true;

        setTimeout(() => {
          this.toastVisivel = false;
        }, 3000);
      },
    });
  }

  abrirModal(familia: FamilyResponseDTO): void {
    this.familiaSelecionada = familia;

    const modalElement = document.getElementById('modalDeleteFamilia');

    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);

    modal.show();
  }

  confirmarDelete(): void {
    if (!this.familiaSelecionada) return;

    const nome = this.familiaSelecionada.name;

    const responsibleId = this.familiaSelecionada.responsibleId;

    this.familyService.deletarFamilia(responsibleId).subscribe({
      next: () => {
        this.familias = this.familias.filter((item) => item.responsibleId !== responsibleId);

        const modalElement = document.getElementById('modalDeleteFamilia');

        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);

          modal?.hide();
        }

        this.toastMensagem = `${nome} foi deletada com sucesso`;

        this.toastVisivel = true;

        setTimeout(() => {
          this.toastVisivel = false;
        }, 3000);
      },

      error: (err) => {
        console.error(err);

        this.toastMensagem = 'Erro ao deletar família.';

        this.toastVisivel = true;

        setTimeout(() => {
          this.toastVisivel = false;
        }, 3000);
      },
    });
  }
}
