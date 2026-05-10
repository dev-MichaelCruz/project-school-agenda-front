export interface TeacherDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  classroomIds: number[];
}

export interface TeacherClassroomDTO {
  id: number;
  name: string;
}

export interface TeacherResponseDTO {
  teacherId: number;
  userId: number;
  name: string;
  email: string;
  classrooms: TeacherClassroomDTO[];
}
