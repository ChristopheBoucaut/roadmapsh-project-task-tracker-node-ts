import { Task } from "src/domain/task"
import TaskRepository from "../domain/taskRepository"

export default function setupDeleteTask(taskRepository: TaskRepository): (request: DeleteTaskRequest) => DeleteTaskResponse {
    return (request: DeleteTaskRequest): DeleteTaskResponse => {
        const deleted = taskRepository.delete(request.taskId)

        return {deleted}
    }
}

type DeleteTaskRequest = Readonly<{
    taskId: Task['id'],
}>

type DeleteTaskResponse = Readonly<{
    deleted: boolean,
}>
