import { Task, TaskStatus } from "../domain/task"
import TaskRepository from "../domain/taskRepository"

export default function setupProgressTask(taskRepository: TaskRepository): (request: ProgressTaskRequest) => ProgressTaskResponse {
    return (request: ProgressTaskRequest): ProgressTaskResponse => {
        const task = taskRepository.get(request.taskId)

        if (!task) {
            return createResponseForError(`Task not found for id ${request.taskId}`)
        }

        if (!task.progress()) {
            return createResponseForError(`Task is done, you can't advance it for id ${request.taskId}`)
        }
        taskRepository.save(task)

        return {newStatus: task.getStatus(), errorMsg: null}
    }
}

type ProgressTaskRequest = Readonly<{
    taskId: Task['id'],
}>

type ProgressTaskResponse = Readonly<{
    newStatus: TaskStatus | null,
    errorMsg: string | null,
}>

function createResponseForError(errorMsg: string): ProgressTaskResponse {
    return {newStatus: null, errorMsg: errorMsg}
}