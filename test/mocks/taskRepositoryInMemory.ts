import { Task } from "../../src/domain/task"
import TaskRepository, { Query } from "../../src/domain/taskRepository"

export class TaskRepositoryInMemory implements TaskRepository {
    private readonly tasks: Record<string, Task> = {}

    get(id: string): Task | null {
        return this.tasks[id] || null
    }

    find(query: Query): Task[] {
        const tasks: Task[] = []

        for (const taskId in this.tasks) {
            if (!this.tasks[taskId] || query.taskStatuses.length > 0 && !this.tasks[taskId].statusIs(query.taskStatuses)) {
                continue
            }
            tasks.push(this.tasks[taskId])
        }

        return tasks
    }

    save(task: Task): void {
        this.tasks[task.id] = task
    }

    delete(taskOrTaskId: Task | Task['id']): boolean
    {
        const taskIdToDelete = taskOrTaskId instanceof Task ? taskOrTaskId.id : taskOrTaskId
        if (this.tasks[taskIdToDelete]) {
            delete this.tasks[taskIdToDelete]
            return true
        }
        return false
    }
}
