import { TaskCategory } from "./TaskCategory";

export interface Todos {

    id: number;
    taskCategory: TaskCategory;
    task: string;
    date: number;
    time: number;
    firstname: string;
    lastname: string;
    email: string;
    service_type : string
    taskNotes: string
  createdAt: number;

}
