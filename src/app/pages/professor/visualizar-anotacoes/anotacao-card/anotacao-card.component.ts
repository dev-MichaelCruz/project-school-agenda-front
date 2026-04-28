import {
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anotacao-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anotacao-card.component.html',
  styleUrl: './anotacao-card.component.scss'
})
export class AnotacaoCardComponent {

  data = input.required<string>();

  lida = input(false);

  visivelTutores = input(true);

  selecionada = input(false);

  abrir = output<void>();

  onClick(): void {
    this.abrir.emit();
  }

}