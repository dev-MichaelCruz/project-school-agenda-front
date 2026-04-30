import {
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecionar-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecionar-aluno.component.html',
  styleUrls: ['./selecionar-aluno.component.scss'],
})
export class SelecionarAlunoComponent {
  alunos = input<any[]>([]);
  role = input<'professor' | 'responsavel'>('professor');
  selecionar = output<any>();
  voltar = output<void>();
}
