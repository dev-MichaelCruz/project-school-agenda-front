import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note, NoteDTO } from '../../models/notes.dto';
import { map, Observable } from 'rxjs';
import { api_service } from '../base-url';

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  private api = api_service;

  constructor(private http: HttpClient) { }

  getNotesByStudent(studentId: number): Observable<Note[]> {

    return this.http
      .get<NoteDTO[]>(`${this.api}/notes/student/${studentId}`)
      .pipe(
        map((list: NoteDTO[]) =>
          list.map((item: NoteDTO) => this.mapToUI(item))
        )
      );
  }

  createNote(
    studentId: number,
    texto: string,
    visibleToResponsible: boolean,
    imagem?: File | null
  ): Observable<any> {

    const formData = new FormData();

    formData.append('studentId', String(studentId));
    formData.append('title', 'Anotação');
    formData.append('content', texto);
    formData.append('type', 'BEHAVIOR');
    formData.append(
      'visibleToResponsible',
      String(visibleToResponsible)
    );

    if (imagem) {
      formData.append('images', imagem);
    }

    return this.http.post(`${this.api}/notes`, formData);
  }

  updateNoteStatus(
    note: NoteDTO,
    status: 'OPEN' | 'RESOLVED'
  ) {

    return this.http.patch(`${this.api}/notes/${note.id}`, {
      title: note.title,
      content: note.content,
      type: note.type,
      visibleToResponsible: note.visibleToResponsible,
      status: status,
    });
  }

  private mapToUI(dto: NoteDTO): Note {

    return {
      id: dto.id,

      data: new Date(dto.createdAt)
        .toLocaleDateString('pt-BR'),

      texto: dto.content,

      lida: dto.status === 'RESOLVED',

      visivelTutores: dto.visibleToResponsible,

      authorName: dto.authorName,

      authorRole: dto.authorRole,

      imagens: dto.images?.map(img => img.url) ?? [],

      raw: dto,
    };
  }
}