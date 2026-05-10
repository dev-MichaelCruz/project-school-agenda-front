export interface TeacherDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  classroomIds: number[];
}

export interface TeacherResponseDTO {
  email: string;
  name: string;
  teacherId: number;
  classroomIds: number[];
  userId: number;
}
