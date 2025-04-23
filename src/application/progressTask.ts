import { TaskStatus } from "../domain/task"
import TaskRepository from "../domain/taskRepository"

export default class ProgressTask {
    constructor(
        private taskRepository: TaskRepository
    ) {
    }

    execute(request: ProgressTaskRequest): ProgressTaskResponse {
        const task = this.taskRepository.get(request.taskId)

        if (!task) {
            return ProgressTaskResponse.createForError(`Task not found for id ${request.taskId}`)
        }

        if (!task.progress()) {
            return ProgressTaskResponse.createForError(`Task is done, you can't advance it for id ${request.taskId}`)
        }
        this.taskRepository.save(task)

        return new ProgressTaskResponse(task.getStatus())
    }
}

export class ProgressTaskRequest {
    constructor(
        readonly taskId: string
    ) {
    }
}

class ProgressTaskResponse {
    constructor(
        readonly newStatus: TaskStatus | null,
        readonly errorMsg: string | null = null,
    ) {
    }

    static createForError(errorMsg: string): ProgressTaskResponse {
        return new ProgressTaskResponse(null, errorMsg)
    }
}
