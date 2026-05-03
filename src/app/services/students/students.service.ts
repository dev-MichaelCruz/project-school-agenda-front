import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Student, StudentDTO } from '../../models/students.dto';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private api = 'https://schoolagenda.duckdns.org/api';

  constructor(private http: HttpClient) {}

  private mapToStudent(dto: StudentDTO): Student {
    return {
      id: dto.id,
      nome: dto.name,
      sexo: dto.gender === 'MALE' ? 'M' : 'F'
    };
  }

  getMyStudentsAsResponsible(): Observable<Student[]> {
    return this.http
      .get<StudentDTO[]>(`${this.api}/students/my/responsible`)
      .pipe(
        map((dtos) => dtos.map(dto => this.mapToStudent(dto)))
      );
  }

}
