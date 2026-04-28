import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { AnotacaoCardComponent } from './anotacao-card/anotacao-card.component';
import { AnotacoesViewComponent } from './anotacoes-view/anotacoes-view.component';

@Component({
  selector: 'app-visualizar-anotacoes',
  standalone: true,
  imports: [
    CommonModule,
    AnotacaoCardComponent,
    AnotacoesViewComponent
  ],
  templateUrl: './visualizar-anotacoes.component.html',
  styleUrl: './visualizar-anotacoes.component.scss',
})
export class VisualizarAnotacoesComponent {

  private route = inject(ActivatedRoute);

  role = signal<'professor' | 'responsavel'>('professor');

  constructor() {

    const roleRoute = this.route.snapshot.data['role'];

    if (roleRoute) {
      this.role.set(roleRoute);
    }

  }

  anotacoes = signal([
    {
      id: 1,
      data: '03/03/2026',
      lida: false,
      visivelTutores: true,
      texto: 'Lipsum dolor sit amet 1'
    },
    {
      id: 2,
      data: '05/03/2026',
      lida: true,
      visivelTutores: false,
      texto: 'Lipsum dolor sit amet 2'
    }
  ]);

  anotacoesPais = signal([
    {
      id: 101,
      data: '10/03/2026',
      lida: false,
      visivelTutores: true,
      texto: 'Mensagem enviada pelos pais 1'
    },
    {
      id: 102,
      data: '11/03/2026',
      lida: true,
      visivelTutores: true,
      texto: 'Mensagem enviada pelos pais 2'
    }
  ]);

  selecionadaId = signal<number | null>(null);

  anotacaoSelecionada = computed(() => {

    const id = this.selecionadaId();

    if (!id) return null;

    return [
      ...this.anotacoes(),
      ...this.anotacoesPais()
    ].find(item => item.id === id) ?? null;

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

    this.anotacoes.update(lista =>
      lista.map(item =>
        item.id === id
          ? { ...item, lida: true }
          : item
      )
    );

    this.anotacoesPais.update(lista =>
      lista.map(item =>
        item.id === id
          ? { ...item, lida: true }
          : item
      )
    );
  }

}