import {
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Role, roleEnum } from '../../../../types/role';
import { ListToolbar } from '../../../../components/list-toolbar/list-toolbar';
import { matchesSearch } from '../../../../utils/search';
import { Student } from '../../../../models/students.dto';

@Component({
  selector: 'app-selecionar-aluno',
  standalone: true,
  imports: [CommonModule, ListToolbar],
  templateUrl: './selecionar-aluno.component.html',
  styleUrls: ['./selecionar-aluno.component.scss'],
})
export class SelecionarAlunoComponent {
  roleEnum = roleEnum;

  alunos = input<Student[]>([]);
  titulo = input('Adicionar anotação');
  role = input<Role | null>(null);

  selecionar = output<Student>();
  voltar = output<void>();
  atualizar = output<void>();
  busca = signal('');
  alunosFiltrados = computed(() =>
    this.alunos().filter((aluno) => matchesSearch(aluno.nome, this.busca()))
  );
}
