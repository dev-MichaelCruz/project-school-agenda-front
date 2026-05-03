import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note, NoteDTO } from '../../models/notes.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private api = 'https://schoolagenda.duckdns.org/api';

  constructor(private http: HttpClient) {}

  getNotesByStudent(studentId: number): Observable<Note[]> {
    return this.http
      .get<NoteDTO[]>(`${this.api}/notes/student/${studentId}`)
      .pipe(map((list: NoteDTO[]) => list.map((item: NoteDTO) => this.mapToUI(item))));
  }

  private mapToUI(dto: NoteDTO): Note {
    return {
      id: dto.id,
      data: new Date(dto.createdAt).toLocaleDateString('pt-BR'),
      texto: dto.content,
      lida: dto.status === 'READ',
      visivelTutores: dto.visibleToResponsible,
    };
  }
}
