import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecionar-turma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecionar-turma.component.html'
})
export class SelecionarTurmaComponent {

  @Input() turmas: string[] = [];

  @Output() selecionar = new EventEmitter<string>();

}
