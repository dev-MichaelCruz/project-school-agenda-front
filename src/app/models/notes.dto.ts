export interface NoteImageDTO {
  id: number;
  filename: string;
  contentType: string;
  size: number;
  storageKey: string;
  url: string;
}

export interface NoteDTO {
  id: number;
  studentId: number;
  studentName: string;

  authorId: number;
  authorName: string;
  authorRole: string;

  title: string;
  content: string;

  type: string;
  status: string;

  visibleToResponsible: boolean;

  createdAt: string;
  updatedAt: string;

  images: NoteImageDTO[];
}

export interface Note {
  id: number;

  data: string;

  texto: string;

  lida: boolean;

  visivelTutores: boolean;

  authorName: string;
  authorRole: string;

  imagens: string[];

  raw: NoteDTO;
}