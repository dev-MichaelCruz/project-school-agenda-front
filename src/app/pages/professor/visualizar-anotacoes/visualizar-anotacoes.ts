import {
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AnotacaoCardComponent } from './anotacao-card/anotacao-card.component';
import { AnotacoesViewComponent } from './anotacoes-view/anotacoes-view.component';
import { SelecionarAlunoComponent } from '../adicionar-anotacoes/selecionar-aluno/selecionar-aluno.component';

import { AuthService } from '../../../services/auth-service';
import { roleEnum } from '../../../types/role';

import { NotesService } from '../../../services/notes/notes.service';
import { StudentsService } from '../../../services/students/students.service';

import { Note } from '../../../models/notes.dto';
import { Student } from '../../../models/students.dto';

@Component({
  selector: 'app-visualizar-anotacoes',
  standalone: true,
  imports: [
    CommonModule,
    AnotacaoCardComponent,
    AnotacoesViewComponent,
    SelecionarAlunoComponent
  ],
  styleUrls: ['./visualizar-anotacoes.component.scss'],
  templateUrl: './visualizar-anotacoes.component.html',
})
export class VisualizarAnotacoesComponent {

  private auth = inject(AuthService);
  private notesService = inject(NotesService);
  private studentsService = inject(StudentsService);

  role = this.auth.role;
  roleEnum = roleEnum;

  etapa = signal<'aluno' | 'lista'>('aluno');

  alunos = signal<Student[]>([]);
  alunoSelecionado = signal<Student | null>(null);

  anotacoes = signal<Note[]>([]);
  anotacoesPais = signal<Note[]>([]);

  selecionadaId = signal<number | null>(null);

  constructor() {

    effect(() => {
      const role = this.role();

      if (!role) return;

      if (role === roleEnum.RESPONSIBLE) {

        this.studentsService.getMyStudentsAsResponsible().subscribe({
          next: (res) => this.alunos.set(res),
          error: (err) => {
            console.error(err);
            this.alunos.set([]);
          }
        });

      }

      // Professor (mock por enquanto)
      if (role === roleEnum.TEACHER) {
        this.alunos.set([
          { id: 1, nome: 'João', sexo: 'M' },
          { id: 2, nome: 'Maria', sexo: 'F' }
        ]);
      }
    });

    effect(() => {
      const aluno = this.alunoSelecionado();
      const role = this.role();

      if (!aluno || !role) return;

      this.notesService.getNotesByStudent(aluno.id).subscribe({
        next: (notas) => {

          if (role === roleEnum.TEACHER) {

            this.anotacoes.set(notas.filter(n => !n.visivelTutores));
            this.anotacoesPais.set(notas.filter(n => n.visivelTutores));

          } else {

            this.anotacoes.set([]);
            this.anotacoesPais.set(notas.filter(n => n.visivelTutores));

          }

          this.etapa.set('lista');
        },
        error: (err) => {
          console.error(err);
        }
      });
    });

  }

  anotacaoSelecionada = computed(() => {
    const id = this.selecionadaId();

    if (!id) return null;

    return [
      ...this.anotacoes(),
      ...this.anotacoesPais()
    ].find(item => item.id === id) ?? null;
  });


  selecionarAluno(aluno: Student): void {
    this.alunoSelecionado.set(aluno);
  }

  voltar(): void {
    this.etapa.set('aluno');
  }

  selecionar(id: number): void {
    this.selecionadaId.set(id);
  }

  fecharView(): void {
    this.selecionadaId.set(null);
  }

  marcarComoLida(): void {

    const id = this.selecionadaId();
    if (!id) return;

    this.anotacoes.update(lista =>
      lista.map(item =>
        item.id === id ? { ...item, lida: true } : item
      )
    );

    this.anotacoesPais.update(lista =>
      lista.map(item =>
        item.id === id ? { ...item, lida: true } : item
      )
    );
  }
}
