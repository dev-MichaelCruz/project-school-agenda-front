import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { api_service } from '../base-url';

import { TeacherDTO, TeacherResponseDTO } from '../../models/teacher.dto';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private api = api_service;

  constructor(private http: HttpClient) {}

  cadastrarProfessor(professor: TeacherDTO): Observable<TeacherResponseDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<TeacherResponseDTO>(`${this.api}/director/teachers`, professor, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao cadastrar professor:', error);

          return throwError(() => error);
        }),
      );
  }
}
