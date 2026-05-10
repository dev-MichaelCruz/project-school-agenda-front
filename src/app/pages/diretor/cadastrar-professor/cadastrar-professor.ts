import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';

import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ClassroomsService } from '../../../services/classrooms/classrooms.service';

import { Classroom } from '../../../models/classrooms.dto';


import { TeacherDTO } from '../../../models/teacher.dto';
import { TeachersService } from '../../../services/teachers/teachers.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cadastrar-professor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-professor.html',
  styleUrl: './cadastrar-professor.scss',
})
export class CadastrarProfessor implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);

  private classroomsService = inject(ClassroomsService);

  private teachersService = inject(TeachersService);

  @ViewChild('statusModal')
  modalElement!: ElementRef;

  private modalInstance: any;

  modalTitulo = '';

  modalMensagem = '';

  turmasDisponiveis: Classroom[] = [];

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],

    sobrenome: ['', [Validators.required, Validators.minLength(2)]],

    email: ['', [Validators.required, Validators.email]],

    senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],

    turmas: this.fb.array([this.fb.control('', Validators.required)]),
  });

  ngOnInit(): void {
    this.classroomsService.getAllClassrooms().subscribe({
      next: (res) => {
        this.turmasDisponiveis = res;
      },

      error: (err) => {
        console.error(err);

        this.abrirModal('Erro', 'Não foi possível carregar as turmas.');
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.modalElement?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  get turmas(): FormArray {
    return this.form.get('turmas') as FormArray;
  }

  adicionarTurma(): void {
    this.turmas.push(this.fb.control('', Validators.required));
  }

  removerTurma(index: number): void {
    if (this.turmas.length > 1) {
      this.turmas.removeAt(index);
    }
  }

  abrirModal(titulo: string, mensagem: string): void {
    this.modalTitulo = titulo;

    this.modalMensagem = mensagem;

    this.modalInstance?.show();
  }

  fecharModal(): void {
    this.modalInstance?.hide();
  }

  cadastrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const formValue = this.form.getRawValue();

    const classroomIds = (formValue.turmas ?? [])
      .map((nomeTurma) => {
        return this.turmasDisponiveis.find((turma) => turma.nome === nomeTurma)?.id;
      })
      .filter((id): id is number => !!id);

    const professorDTO: TeacherDTO = {
      firstName: formValue.nome ?? '',

      lastName: formValue.sobrenome ?? '',

      email: formValue.email ?? '',

      password: formValue.senha ?? '',

      classroomIds,
    };

    this.teachersService.cadastrarProfessor(professorDTO).subscribe({
      next: (response) => {
        this.abrirModal('Sucesso', `Professor ${response.name} cadastrado com sucesso!`);

        this.form.reset();

        this.turmas.clear();

        this.turmas.push(this.fb.control('', Validators.required));
      },

      error: (error) => {
        console.error(error);

        let mensagem = 'Erro desconhecido ao cadastrar professor.';

        if (typeof error?.error === 'string') {
          mensagem = error.error;
        } else if (error?.error?.message) {
          mensagem = error.error.message;
        } else if (error?.error?.error) {
          mensagem = error.error.error;
        } else if (Array.isArray(error?.error?.errors)) {
          mensagem = error.error.errors.join(', ');
        }

        this.abrirModal('Erro', mensagem);
      },
    });
  }
}
