export interface NoteDTO {
  id: number;
  studentId: number;
  studentName: string;
  authorId: number;
  authorName: string;
  title: string;
  content: string;
  type: string;
  status: string;
  visibleToResponsible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: number;
  data: string;
  texto: string;
  lida: boolean;
  visivelTutores: boolean;
  raw: NoteDTO;
}
