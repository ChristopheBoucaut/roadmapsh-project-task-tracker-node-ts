import TaskRepository from "../domain/taskRepository"

export default class DeleteTask {
    constructor(
        private taskRepository: TaskRepository
    ) {
    }

    execute(request: DeleteTaskRequest): DeleteTaskResponse {
        const deleted = this.taskRepository.delete(request.taskId)

        return new DeleteTaskResponse(deleted)
    }
}

export class DeleteTaskRequest {
    constructor(
        readonly taskId: string,
    ) {
    }
}

class DeleteTaskResponse {
    constructor(
        readonly deleted: boolean,
    ) {
    }
}
