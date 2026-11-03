import {
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Classroom } from '../../../../models/classrooms.dto';
import { ListToolbar } from '../../../../components/list-toolbar/list-toolbar';
import { matchesSearch } from '../../../../utils/search';


@Component({
  selector: 'app-selecionar-turma',
  standalone: true,
  imports: [CommonModule, ListToolbar],
  templateUrl: './selecionar-turma.component.html',
  styleUrl: './selecionar-turma.component.scss',
})
export class SelecionarTurmaComponent {

  turmas = input<Classroom[]>([]);

  selecionar = output<Classroom>();
  atualizar = output<void>();
  busca = signal('');
  turmasFiltradas = computed(() =>
    this.turmas().filter((turma) => matchesSearch(turma.nome, this.busca()))
  );
}
