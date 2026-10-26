import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timeout, TimeoutError } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ListToolbar } from '../../../components/list-toolbar/list-toolbar';
import { DataFeedback } from '../../../components/data-feedback/data-feedback';
import { DATA_LOAD_TIMEOUT_MS, DataLoadState } from '../../../utils/data-load-state';
import { matchesSearch } from '../../../utils/search';

import { FamilyService } from '../../../services/family/family.service';

import { FamilyResponseDTO } from '../../../models/family.dto';
import { AccessibleModal } from '../../../directives/accessible-modal';
import { focusMainHeading } from '../../../utils/focus-management';

declare const bootstrap: any;

@Component({
  selector: 'app-deletar-familia',
  standalone: true,
  imports: [CommonModule, ListToolbar, DataFeedback, AccessibleModal],
  templateUrl: './deletar-familia.html',
  styleUrl: './deletar-familia.scss',
})
export class DeletarFamilia implements OnInit {
  private familyService = inject(FamilyService);
  private destroyRef = inject(DestroyRef);

  estadoDados = signal<DataLoadState>('idle');

  familias: FamilyResponseDTO[] = [];
  busca = '';

  get familiasFiltradas(): FamilyResponseDTO[] {
    return this.familias.filter((familia) => matchesSearch(familia.name, this.busca));
  }

  familiaSelecionada: FamilyResponseDTO | null = null;

  toastVisivel = false;

  toastMensagem = '';
  erroExclusao = signal('');

  fecharMensagem(): void {
    this.toastVisivel = false;
    focusMainHeading();
  }

  ngOnInit(): void {
    this.carregarFamilias();
  }

  carregarFamilias(): void {
    if (this.estadoDados() === 'loading') return;

    this.estadoDados.set('loading');

    this.familyService.listarFamilias().pipe(
      timeout(DATA_LOAD_TIMEOUT_MS),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (res) => {
        this.familias = res ?? [];
        this.estadoDados.set('loaded');
      },

      error: (err) => {
        this.estadoDados.set(err instanceof TimeoutError ? 'timeout' : 'error');
      },
    });
  }

  abrirModal(familia: FamilyResponseDTO): void {
    this.erroExclusao.set('');
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

      },

      error: (err) => {
        console.error(err);

        this.erroExclusao.set('Não foi possível excluir a família. Tente novamente.');
      },
    });
  }
}
