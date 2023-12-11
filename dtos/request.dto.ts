export interface createClassRoomDto {
    className : string,
    numberOfStudent: number
}
export interface createStudentDto {
    name: string,
    subjects: string[],
    age: number,
    class: string
}
export interface createTeacherDto {
    name: string,
    teaches: string[],
    class: string,
    club: string[],
    role: string,

}
export interface createSubjectDto {
    name: string,
}

export interface getStudentsDto {
    class : string,
}
export interface updateStudentsMark {
    class: string,
    subject: string
}