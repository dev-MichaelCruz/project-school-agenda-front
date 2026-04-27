import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelecionarTurmaComponent } from './selecionar-turma/selecionar-turma.component';
import { SelecionarAlunoComponent } from './selecionar-aluno/selecionar-aluno.component';
import { FormAdicionarAnotacaoComponent } from './form-adicionar-anotacao/form-adicionar-anotacao.component';

@Component({
  selector: 'app-adicionar-anotacoes',
  standalone: true,
  imports: [
    CommonModule,
    SelecionarTurmaComponent,
    SelecionarAlunoComponent,
    FormAdicionarAnotacaoComponent,
  ],
  templateUrl: './adicionar-anotacoes.html',
})
export class AdicionarAnotacoes {

  etapa = signal<'turma' | 'aluno' | 'form'>('turma');

  turmaSelecionada = signal<any>(null);
  alunoSelecionado = signal<any>(null);

  turmas = ['Turma 1', 'Turma 2', 'Turma 3'];

  alunos = [
    { id: 1, nome: 'João', sexo: 'M' },
    { id: 2, nome: 'Maria', sexo: 'F' },
    { id: 3, nome: 'Pedro', sexo: 'M' }
  ];

  selecionarTurma(turma: string) {
    this.turmaSelecionada.set(turma);
    this.etapa.set('aluno');
  }

  selecionarAluno(aluno: any) {
    this.alunoSelecionado.set(aluno);
    this.etapa.set('form');
  }

  voltarTurma() {
    this.etapa.set('turma');
  }

  voltarAluno() {
    this.etapa.set('aluno');
  }

  salvarAnotacao(dados: any) {
    console.log('Salvar anotação', dados);

    alert('Anotação salva com sucesso');

    this.etapa.set('turma');
  }

}
