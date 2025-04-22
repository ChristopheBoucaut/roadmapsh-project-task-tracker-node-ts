import { Task, TaskStatus } from "./task"

export default interface TaskRepository {
    find(request: TaskRequest): Task[]
    get(id: string): Task | null
    save(task: Task): void
    delete(taskOrTaskId: Task | string): boolean
}

export class TaskRequest {
    constructor(
        readonly taskStatuses: TaskStatus[] = [],
        readonly taskIds: string[] = [],
    ) {
    }
}
