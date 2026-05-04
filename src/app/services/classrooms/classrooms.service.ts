import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Classroom, ClassroomDTO, ClassroomsResponseDTO, StudentsByClassroomResponseDTO } from '../../models/classrooms.dto';
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
