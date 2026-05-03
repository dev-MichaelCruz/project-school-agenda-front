import { StudentDTO } from "./students.dto";

export interface ClassroomDTO {
  id: number;
  name: string;
}

export interface ClassroomsResponseDTO {
  teacherId: number;
  teacherName: string;
  classrooms: ClassroomDTO[];
}

export interface Classroom {
  id: number;
  nome: string;
}

export interface StudentsByClassroomResponseDTO {
  students: StudentDTO[];
}
