import {
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Classroom } from '../../../../models/classrooms.dto';


@Component({
  selector: 'app-selecionar-turma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecionar-turma.component.html'
})
export class SelecionarTurmaComponent {

  turmas = input<Classroom[]>([]);

  selecionar = output<Classroom>();
}
