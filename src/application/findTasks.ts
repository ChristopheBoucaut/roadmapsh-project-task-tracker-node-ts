import { Task, TaskStatus } from "../domain/task"
import TaskRepository, { createQuery } from "../domain/taskRepository"

export default class FindTasks {
    constructor(
        private taskRepository: TaskRepository
    ) {
    }

    execute(request: FindTasksRequest): FindTasksResponse {
        const tasks = this.taskRepository.find(createQuery(
            request.taskStatus !== null ? [request.taskStatus] : []
        ))

        return new FindTasksResponse(tasks)
    }
}

export class FindTasksRequest {
    constructor(
        readonly taskStatus: TaskStatus | null
    ) {
    }
}

class FindTasksResponse {
    constructor(
        readonly tasks: Task[]
    ) {
    }
}
