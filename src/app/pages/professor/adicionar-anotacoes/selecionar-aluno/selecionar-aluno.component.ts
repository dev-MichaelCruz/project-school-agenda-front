import {
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Role, roleEnum } from '../../../../types/role';

@Component({
  selector: 'app-selecionar-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecionar-aluno.component.html',
  styleUrls: ['./selecionar-aluno.component.scss'],
})
export class SelecionarAlunoComponent {
  roleEnum = roleEnum; // 👈 ESSENCIAL

  alunos = input<any[]>([]);
  role = input<Role | null>(null);

  selecionar = output<any>();
  voltar = output<void>();
}
