import { Component, computed, effect, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AnotacaoCardComponent } from './anotacao-card/anotacao-card.component';
import { AnotacoesViewComponent } from './anotacoes-view/anotacoes-view.component';

import { AuthService } from '../../../services/auth-service';

import { roleEnum } from '../../../types/role';
import { NotesService } from '../../../services/notes/notes.service';
import { Note } from '../../../models/notes.dto';

@Component({
  selector: 'app-visualizar-anotacoes',
  standalone: true,
  imports: [CommonModule, AnotacaoCardComponent, AnotacoesViewComponent],
  templateUrl: './visualizar-anotacoes.component.html',
  styleUrl: './visualizar-anotacoes.component.scss',
})
export class VisualizarAnotacoesComponent {
  private auth = inject(AuthService);
  private notesService = inject(NotesService);

  role = this.auth.role;
  roleEnum = roleEnum;

  /**
   * IMPORTANTE:
   * depois você vai trocar isso pelo aluno selecionado
   */
  selectedStudentId = signal<number>(1);

  anotacoes = signal<Note[]>([]);
  anotacoesPais = signal<Note[]>([]);

  selecionadaId = signal<number | null>(null);

  constructor() {
    effect(() => {
      const role = this.role();
      const studentId = this.selectedStudentId();

      if (!role || !studentId) return;

      this.notesService.getNotesByStudent(studentId).subscribe({
        next: (notas) => {
          if (role === roleEnum.TEACHER) {
            /**
             * Professor vê:
             * - tudo
             * separando:
             *   próprias vs pais
             */
            this.anotacoes.set(notas.filter((n) => !n.visivelTutores));

            this.anotacoesPais.set(notas.filter((n) => n.visivelTutores));
          } else {
            /**
             * Responsável vê só o que é visível
             */
            this.anotacoes.set([]);
            this.anotacoesPais.set(notas.filter((n) => n.visivelTutores));
          }
        },
        error: (err) => {
          console.error('Erro ao buscar notas', err);
        },
      });
    });
  }

  anotacaoSelecionada = computed(() => {
    const id = this.selecionadaId();
    if (!id) return null;

    return [...this.anotacoes(), ...this.anotacoesPais()].find((item) => item.id === id) ?? null;
  });

  selecionar(id: number): void {
    this.selecionadaId.set(id);
  }

  fecharView(): void {
    this.selecionadaId.set(null);
  }

  marcarComoLida(): void {
    const id = this.selecionadaId();
    if (!id) return;

    this.anotacoes.update((lista) =>
      lista.map((item) => (item.id === id ? { ...item, lida: true } : item)),
    );

    this.anotacoesPais.update((lista) =>
      lista.map((item) => (item.id === id ? { ...item, lida: true } : item)),
    );
  }
}
