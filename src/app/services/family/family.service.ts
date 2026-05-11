// src/app/services/family/family.service.ts

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';

import { api_service } from '../base-url';

import { FamilyDTO, FamilyResponseDTO } from '../../models/family.dto';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  private api = api_service;

  constructor(private http: HttpClient) {}

  cadastrarFamilia(familia: FamilyDTO): Observable<FamilyResponseDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<FamilyResponseDTO>(`${this.api}/director/families`, familia, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao cadastrar família:', error);

          return throwError(() => error);
        }),
      );
  }

  listarFamilias(): Observable<FamilyResponseDTO[]> {
    return this.http.get<FamilyResponseDTO[]>(`${this.api}/director/families`).pipe(
      catchError((error) => {
        console.error('Erro ao listar famílias:', error);

        return throwError(() => error);
      }),
    );
  }

  deletarFamilia(responsibleId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/director/families/${responsibleId}`).pipe(
      catchError((error) => {
        console.error('Erro ao deletar família:', error);

        return throwError(() => error);
      }),
    );
  }
}
