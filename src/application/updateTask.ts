import TaskRepository from "../domain/taskRepository"

export default class UpdateTask {
    constructor(
        private taskRepository: TaskRepository
    ) {
    }

    execute(request: UpdateTaskRequest): UpdateTaskResponse {
        const task = this.taskRepository.get(request.taskId)

        if (!task) {
            return UpdateTaskResponse.createForError(`Task not found for id ${request.taskId}`)
        }

        task.updateDescription(request.newDescription)
        this.taskRepository.save(task)

        return new UpdateTaskResponse()
    }
}

export class UpdateTaskRequest {
    constructor(
        readonly taskId: string,
        readonly newDescription: string,
    ) {
    }
}

class UpdateTaskResponse {
    constructor(
        readonly errorMsg: string | null = null,
    ) {
    }

    static createForError(errorMsg: string): UpdateTaskResponse {
        return new UpdateTaskResponse(errorMsg)
    }
}
