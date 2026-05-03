import { Component, effect, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SelecionarTurmaComponent } from './selecionar-turma/selecionar-turma.component';
import { SelecionarAlunoComponent } from './selecionar-aluno/selecionar-aluno.component';
import { FormAdicionarAnotacaoComponent } from './form-adicionar-anotacao/form-adicionar-anotacao.component';

import { AuthService } from '../../../services/auth-service';
import { roleEnum } from '../../../types/role';
import { StudentsService } from '../../../services/students/students.service';
import { NotesService } from '../../../services/notes/notes.service';

import { Student } from '../../../models/students.dto';
import { ElementRef, ViewChild } from '@angular/core';

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
  private auth = inject(AuthService);
  private studentsService = inject(StudentsService);
  private notesService = inject(NotesService);

  role = this.auth.role;
  roleEnum = roleEnum;

  etapa = signal<'turma' | 'aluno' | 'form'>('turma');

  turmaSelecionada = signal<any>(null);
  alunoSelecionado = signal<Student | null>(null);

  turmas = ['Turma 1', 'Turma 2', 'Turma 3'];

  alunos = signal<Student[]>([]);

  modalMensagem = signal('');

  @ViewChild('modalRef') modalElement!: ElementRef;

  private modalInstance: any;

  private alunosProfessorMock: Student[] = [
    { id: 1, nome: 'João', sexo: 'M' },
    { id: 2, nome: 'Maria', sexo: 'F' },
    { id: 3, nome: 'Pedro', sexo: 'M' },
  ];

  constructor() {
    effect(() => {
      const role = this.role();

      if (!role) return;

      if (role === roleEnum.RESPONSIBLE) {
        this.etapa.set('aluno');

        this.studentsService.getMyStudentsAsResponsible().subscribe({
          next: (res) => this.alunos.set(res),
          error: () => this.alunos.set([]),
        });
      }

      if (role === roleEnum.TEACHER) {
        this.alunos.set(this.alunosProfessorMock);
      }
    });
  }

  ngAfterViewInit() {
    // @ts-ignore (bootstrap global)
    this.modalInstance = new window.bootstrap.Modal(this.modalElement.nativeElement);
  }

  selecionarTurma(turma: string): void {
    this.turmaSelecionada.set(turma);
    this.etapa.set('aluno');
  }

  selecionarAluno(aluno: Student): void {
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
    const aluno = this.alunoSelecionado();

    if (!aluno) return;

    this.notesService.createNote(aluno.id, dados.texto).subscribe({
      next: () => {
        this.abrirModal('Anotação salva com sucesso');

        this.etapa.set(this.role() === roleEnum.RESPONSIBLE ? 'aluno' : 'turma');
      },
      error: (err) => {
        console.error(err);

        this.abrirModal('Erro ao salvar anotação');
      },
    });
  }

  abrirModal(mensagem: string): void {
    this.modalMensagem.set(mensagem);
    this.modalInstance.show();
  }

  fecharModal(): void {
    this.modalInstance.hide();
  }
}
