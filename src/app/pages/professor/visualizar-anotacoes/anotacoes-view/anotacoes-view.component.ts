import {
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anotacoes-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anotacoes-view.component.html',
  styleUrl: './anotacoes-view.component.scss',
})
export class AnotacoesViewComponent {

  titulo = input('Visualizar anotação enviada pelos tutores');

  data = input('');

  texto = input('');

  lida = input(false);

  cancelar = output<void>();

  marcarComoLida = output<void>();

}