import { Task } from "src/domain/task"
import TaskRepository from "../domain/taskRepository"

export default function setupUpdateTask(taskRepository: TaskRepository): (request: UpdateTaskRequest) => UpdateTaskResponse {
    return (request: UpdateTaskRequest): UpdateTaskResponse => {
        const task = taskRepository.get(request.taskId)

        if (!task) {
            return createResponseForError(`Task not found for id ${request.taskId}`)
        }

        task.updateDescription(request.newDescription)
        taskRepository.save(task)

        return {errorMsg: null}
    }
}

type UpdateTaskRequest = Readonly<{
    taskId: Task['id'],
    newDescription: Task['description'],
}>

type UpdateTaskResponse = Readonly<{
    errorMsg: string | null,
}>

function createResponseForError(errorMsg: string): UpdateTaskResponse {
    return {errorMsg}
}