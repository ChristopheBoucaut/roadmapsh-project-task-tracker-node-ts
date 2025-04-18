import { Task } from "../../src/domain/task"
import TaskRepository, { TaskRequest } from "../../src/domain/taskRepository"

export class TaskRepositoryInMemory implements TaskRepository {
    private readonly tasks: Record<string, Task> = {}

    get(id: string): Task | null {
        return this.tasks[id] || null
    }

    find(request: TaskRequest): Task[] {
        const tasks: Task[] = []

        for (const taskId in this.tasks) {
            if (request.taskStatuses.length > 0 && !this.tasks[taskId].statusIs(request.taskStatuses)) {
                continue
            }
            tasks.push(this.tasks[taskId])
        }

        return tasks
    }

    save(task: Task): void {
        this.tasks[task.id] = task
    }

    delete(taskOrTaskId: Task | string): Boolean
    {
        const taskIdToDelete = taskOrTaskId instanceof Task ? taskOrTaskId.id : taskOrTaskId
        if (this.tasks[taskIdToDelete]) {
            delete this.tasks[taskIdToDelete]
            return true
        }
        return false
    }
}
