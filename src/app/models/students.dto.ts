export interface StudentDTO {
  id: number;
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  classroomId: number;
  classroomName: string;
}


export interface Student {
  id: number;
  nome: string;
  sexo: 'M' | 'F';
}
