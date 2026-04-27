import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecionar-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecionar-aluno.component.html'
})
export class SelecionarAlunoComponent implements OnInit {

  @Input() alunos: any[] = [];

  @Output() selecionar = new EventEmitter<any>();
  @Output() voltar = new EventEmitter<void>();

  ngOnInit() {
  }

}
