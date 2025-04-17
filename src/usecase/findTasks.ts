import { Task, TaskStatus } from "../domain/task"
import TaskRepository, { TaskRequest } from "../domain/taskRepository"

export default class FindTasks {
    constructor(
        private taskRepository: TaskRepository
    ) {
    }

    execute(request: FindTasksRequest): FindTasksResponse {
        const tasks = this.taskRepository.find(new TaskRequest(request.taskStatus !== null ? [request.taskStatus] : []))

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
