import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, catchError, throwError } from 'rxjs';

import {
  Classroom,
  ClassroomDTO,
  ClassroomsResponseDTO,
  StudentsByClassroomResponseDTO,
} from '../../models/classrooms.dto';

import { Student, StudentDTO } from '../../models/students.dto';

import { api_service } from '../base-url';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  private api = api_service;

  constructor(private http: HttpClient) {}

  getMyClassrooms(): Observable<Classroom[]> {
    return this.http.get<ClassroomsResponseDTO>(`${this.api}/classrooms/my/teacher`).pipe(
      map((res: ClassroomsResponseDTO) =>
        res.classrooms.map((c: ClassroomDTO) => ({
          id: c.id,
          nome: c.name,
        })),
      ),
    );
  }

  getAllClassrooms(): Observable<Classroom[]> {
    return this.http.get<ClassroomDTO[]>(`${this.api}/director/classrooms`).pipe(
      map((classrooms: ClassroomDTO[]) =>
        classrooms.map((c: ClassroomDTO) => ({
          id: c.id,
          nome: c.name,
        })),
      ),
    );
  }

  cadastrarTurma(nome: string): Observable<ClassroomDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<ClassroomDTO>(
        `${this.api}/director/classrooms`,
        {
          name: nome,
        },
        { headers },
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao cadastrar turma:', error);

          return throwError(() => error);
        }),
      );
  }

  deletarTurma(classroomId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/director/classrooms/${classroomId}`).pipe(
      catchError((error) => {
        console.error('Erro ao deletar turma:', error);

        return throwError(() => error);
      }),
    );
  }

  getStudentsByClassroom(classroomId: number): Observable<Student[]> {
    return this.http
      .get<StudentsByClassroomResponseDTO>(`${this.api}/classrooms/${classroomId}/students`)
      .pipe(
        map((res) =>
          res.students.map((dto) => ({
            id: dto.id,
            nome: dto.name,
            sexo: dto.gender === 'MALE' ? 'M' : 'F',
          })),
        ),
      );
  }

  private mapToStudent(dto: StudentDTO): Student {
    return {
      id: dto.id,
      nome: dto.name,
      sexo: dto.gender === 'MALE' ? 'M' : 'F',
    };
  }
}
