import {
  Component,
  effect,
  inject,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { SelecionarTurmaComponent } from './selecionar-turma/selecionar-turma.component';
import { SelecionarAlunoComponent } from './selecionar-aluno/selecionar-aluno.component';
import { FormAdicionarAnotacaoComponent } from './form-adicionar-anotacao/form-adicionar-anotacao.component';

import { AuthService } from '../../../services/auth-service';
import { roleEnum } from '../../../types/role';

import { StudentsService } from '../../../services/students/students.service';
import { NotesService } from '../../../services/notes/notes.service';
import { ClassroomsService } from '../../../services/classrooms/classrooms.service';

import { Student } from '../../../models/students.dto';
import { Classroom } from '../../../models/classrooms.dto';

declare var bootstrap: any;

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
export class AdicionarAnotacoes implements AfterViewInit {
  private auth = inject(AuthService);
  private studentsService = inject(StudentsService);
  private notesService = inject(NotesService);
  private classroomsService = inject(ClassroomsService);

  role = this.auth.role;
  roleEnum = roleEnum;

  etapa = signal<'turma' | 'aluno' | 'form'>('turma');

  turmaSelecionada = signal<Classroom | null>(null);
  alunoSelecionado = signal<Student | null>(null);

  turmas = signal<Classroom[]>([]);
  alunos = signal<Student[]>([]);

  modalMensagem = signal('');

  @ViewChild('modalRef') modalElement!: ElementRef;
  private modalInstance: any;

  ngAfterViewInit() {
    if (this.modalElement?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  constructor() {
    effect(() => {
      const role = this.role();

      if (!role) return;

      // RESPONSIBLE
      if (role === roleEnum.RESPONSIBLE) {
        this.etapa.set('aluno');

        this.studentsService.getMyStudentsAsResponsible().subscribe({
          next: (res) => this.alunos.set(res),
          error: () => this.alunos.set([]),
        });
      }

      // TEACHER → BUSCAR TURMAS
      if (role === roleEnum.TEACHER) {
        this.classroomsService.getMyClassrooms().subscribe({
          next: (res) => this.turmas.set(res),
          error: (err) => {
            console.error(err);
            this.turmas.set([]);
          },
        });
      }
    });
  }

  selecionarTurma(turma: Classroom): void {
    this.turmaSelecionada.set(turma);
    this.alunoSelecionado.set(null);
    this.alunos.set([]);

    this.classroomsService.getStudentsByClassroom(turma.id).subscribe({
      next: (alunos) => {
        this.alunos.set(alunos);
        this.etapa.set('aluno');
      },
      error: (err) => {
        console.error(err);
        this.abrirModal('Erro ao carregar alunos da turma');
      },
    });
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
    this.modalInstance?.show();
  }

  fecharModal(): void {
    this.modalInstance?.hide();
  }
}
