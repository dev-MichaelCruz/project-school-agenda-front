import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

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
}
