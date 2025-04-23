import { generateTaskId, Task, TaskStatus } from "../domain/task"
import TaskRepository from "../domain/taskRepository"

export default class CreateTask {
    constructor(
        private taskRepository: TaskRepository
    ) {
    }

    execute(request: CreateTaskRequest): CreateTaskResponse {
        const task = new Task(
            generateTaskId(),
            request.description,
            TaskStatus.Todo,
            new Date(),
            null
        )
        this.taskRepository.save(task)

        return new CreateTaskResponse(task)
    }
}

export class CreateTaskRequest {
    constructor(
        readonly description: string
    ) {
    }
}

class CreateTaskResponse {
    constructor(
        readonly task: Task
    ) {
    }
}
