import { Task, TaskStatus } from "../domain/task"
import TaskRepository, { createQuery } from "../domain/taskRepository"

export default function setupFindTasks(taskRepository: TaskRepository): (request: FindTasksRequest) => FindTasksResponse {
    return (request: FindTasksRequest): FindTasksResponse => {
        const tasks = taskRepository.find(createQuery(
            request.taskStatus !== null ? [request.taskStatus] : []
        ))

        return {tasks}
    }
}

type FindTasksRequest = Readonly<{
    taskStatus: TaskStatus | null,
}>

type FindTasksResponse = Readonly<{
    tasks: Task[],
}>
