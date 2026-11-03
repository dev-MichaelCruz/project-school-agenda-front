import { Component, inject, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { FamilyService } from '../../../services/family/family.service';

import { FamilyDTO } from '../../../models/family.dto';

import { ClassroomsService } from '../../../services/classrooms/classrooms.service';

import { Classroom } from '../../../models/classrooms.dto';
import { AccessibleControl } from '../../../directives/accessible-control';
import { AccessibleForm } from '../../../directives/accessible-form';
import { AccessibleModal } from '../../../directives/accessible-modal';
import { focusElement } from '../../../utils/focus-management';

declare var bootstrap: any;

@Component({
  selector: 'app-cadastrar-familia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AccessibleControl, AccessibleForm, AccessibleModal],
  templateUrl: './cadastrar-familia.html',
  styleUrl: './cadastrar-familia.scss',
})
export class CadastrarFamilia implements AfterViewInit, OnInit {
  private fb = inject(FormBuilder);

  private familyService = inject(FamilyService);

  private classroomsService = inject(ClassroomsService);

  @ViewChild('statusModal')
  modalElement!: ElementRef;

  private modalInstance: any;

  modalTitulo = '';

  modalMensagem = '';

  turmas = [] as Classroom[];

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],

    sobrenome: ['', [Validators.required, Validators.minLength(2)]],

    email: ['', [Validators.required, Validators.email]],

    senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],

    criancas: this.fb.array([this.criarCrianca()]),
  });

  ngOnInit(): void {
    this.classroomsService.getAllClassrooms().subscribe({
      next: (res) => {
        this.turmas = res;
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

  get criancas(): FormArray {
    return this.form.get('criancas') as FormArray;
  }

  criarCrianca() {
    return this.fb.group({
      nome: ['', Validators.required],

      sexo: ['', Validators.required],

      nascimento: ['', Validators.required],

      turma: ['', Validators.required],
    });
  }

  adicionarCrianca(): void {
    this.criancas.push(this.criarCrianca());
    focusElement(`#child_name_${this.criancas.length - 1}`);
  }

  removerCrianca(index: number): void {
    if (this.criancas.length > 1) {
      this.criancas.removeAt(index);
      focusElement(`#child_name_${Math.min(index, this.criancas.length - 1)}`);
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
    if (this.form.invalid || this.criancas.length === 0) {
      this.form.markAllAsTouched();

      return;
    }

    const formValue = this.form.getRawValue();

    const familiaDTO: FamilyDTO = {
      firstName: formValue.nome ?? '',

      lastName: formValue.sobrenome ?? '',

      email: formValue.email ?? '',

      password: formValue.senha ?? '',

      children: (formValue.criancas ?? []).map((crianca) => ({
        name: crianca.nome ?? '',

        gender: crianca.sexo === 'M' ? 'MALE' : 'FEMALE',

        birthDate: crianca.nascimento ?? '',

        classroomId: this.turmas.find((turma) => turma.nome === crianca.turma)?.id ?? 0,
      })),
    };

    this.familyService.cadastrarFamilia(familiaDTO).subscribe({
      next: (response) => {
        this.abrirModal('Sucesso', `Família ${response.name} cadastrada com sucesso!`);

        this.form.reset();

        this.criancas.clear();

        this.criancas.push(this.criarCrianca());
      },

      error: (error) => {
        console.error(error);

        let mensagem = 'Erro desconhecido ao cadastrar família.';

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
