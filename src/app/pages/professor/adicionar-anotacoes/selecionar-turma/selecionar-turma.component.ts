import {
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecionar-turma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecionar-turma.component.html'
})
export class SelecionarTurmaComponent {

  turmas = input<string[]>([]);

  selecionar = output<string>();

}