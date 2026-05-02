import {
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { SelecionarTurmaComponent } from './selecionar-turma/selecionar-turma.component';
import { SelecionarAlunoComponent } from './selecionar-aluno/selecionar-aluno.component';
import { FormAdicionarAnotacaoComponent } from './form-adicionar-anotacao/form-adicionar-anotacao.component';

import { AuthService } from '../../../services/auth-service';
import { roleEnum } from '../../../types/role';

@Component({
  selector: 'app-adicionar-anotacoes',
  standalone: true,
  imports: [
    CommonModule,
    SelecionarTurmaComponent,
    SelecionarAlunoComponent,
    FormAdicionarAnotacaoComponent
  ],
  templateUrl: './adicionar-anotacoes.html',
})
export class AdicionarAnotacoes {

  private auth = inject(AuthService);

  role = this.auth.role;
  roleEnum = roleEnum;
  etapa = signal<'turma' | 'aluno' | 'form'>('turma');

  turmaSelecionada = signal<any>(null);
  alunoSelecionado = signal<any>(null);

  turmas = ['Turma 1', 'Turma 2', 'Turma 3'];

  alunosProfessor = [
    { id: 1, nome: 'João', sexo: 'M' },
    { id: 2, nome: 'Maria', sexo: 'F' },
    { id: 3, nome: 'Pedro', sexo: 'M' }
  ];

  alunosResponsavel = [
    { id: 1, nome: 'João', sexo: 'M' },
    { id: 3, nome: 'Pedro', sexo: 'M' }
  ];

  alunos = computed(() =>
    this.role() === roleEnum.RESPONSIBLE
      ? this.alunosResponsavel
      : this.alunosProfessor
  );

  constructor() {
    effect(() => {
      if (this.role() === roleEnum.RESPONSIBLE) {
        this.etapa.set('aluno');
      }
    });
  }

  selecionarTurma(turma: string): void {
    this.turmaSelecionada.set(turma);
    this.etapa.set('aluno');
  }

  selecionarAluno(aluno: any): void {
    this.alunoSelecionado.set(aluno);
    this.etapa.set('form');
  }

  voltarTurma(): void {
    if (this.role() === roleEnum.RESPONSIBLE) return;
    this.etapa.set('turma');
  }

  voltarAluno(): void {
    this.etapa.set('aluno');
  }

  salvarAnotacao(dados: any): void {

    console.log({
      role: this.role(),
      aluno: this.alunoSelecionado(),
      ...dados
    });

    alert('Anotação salva com sucesso');

    this.etapa.set(
      this.role() === roleEnum.RESPONSIBLE
        ? 'aluno'
        : 'turma'
    );
  }

}
