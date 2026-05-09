export interface ChildDTO {
  name: string;
  gender: string;
  birthDate: string;
  classroomId: number;
}

export interface FamilyDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  children: ChildDTO[];
}

export interface FamilyResponseDTO {
  email: string;
  name: string;
  responsibleId: number;
  studentIds: number[];
  userId: number;
}
