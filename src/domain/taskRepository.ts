import { Task, TaskStatus } from "./task"

export default interface TaskRepository {
    find(query: Query): Task[]
    get(id: string): Task | null
    save(task: Task): void
    delete(taskOrTaskId: Task | Task['id']): boolean
}

export type Query = Readonly<{
    taskStatuses: TaskStatus[],
    taskIds: string[],
}>

export function createQuery(
    taskStatuses: TaskStatus[] = [],
    taskIds: string[] = [],
): Query {
    return {
        taskStatuses,
        taskIds,
    }
}
