import { Task, TaskStatus } from "../domain/task"
import TaskRepository, { TaskRequest } from "../domain/taskRepository"
import fs from 'fs'

type TaskEntity = {
    id: string,
    description: string,
    status: keyof typeof TaskStatus,
    createdAt: string,
    updatedAt: string | null,
}

export class TaskRepositoryFileSystem implements TaskRepository {
    constructor(
        private readonly pathFile: string,
    ) {
    }

    get(id: string): Task | null {
        const tasks = this.find(new TaskRequest([], [id]))
        if (tasks.length > 1) {
            throw new Error(`We find ${tasks.length} tasks for id ${id}`)
        }

        return tasks[0] || null
    }

    find(request: TaskRequest): Task[] {
        let tasks = this.getAllTasks()

        if (request.taskStatuses.length > 0) {
            tasks = tasks.filter((task: Task): boolean => task.statusIs(request.taskStatuses))
        }
        if (request.taskIds.length > 0) {
            tasks = tasks.filter((task: Task): boolean => request.taskIds.indexOf(task.id) !== -1)
        }

        return tasks
    }

    save(task: Task): void {
        const tasks = this.getAllTasks()
        const existPosition = tasks.findIndex((taskInArr) => taskInArr.id === task.id)

        if (existPosition !== -1) {
            tasks[existPosition] = task
        } else {
            tasks.push(task)
        }

        this.updateDbContentFromTasks(tasks)
    }

    delete(taskOrTaskId: Task | string): boolean
    {
        const taskIdToDelete = taskOrTaskId instanceof Task ? taskOrTaskId.id : taskOrTaskId
        const tasks = this.getAllTasks()

        const existPosition = tasks.findIndex((taskInArr) => taskInArr.id === taskIdToDelete)
        if (existPosition === -1) {
            return false
        }

        delete tasks[existPosition]
        this.updateDbContentFromTasks(tasks.filter((task: Task): boolean => task instanceof Task))
        return true
    }

    private getAllTasks(): Task[] {
        const contentRaw = this.getDbContentRaw()
        if (contentRaw === null) {
            return []
        }
        const taskEntities: TaskEntity[] = JSON.parse(contentRaw)

        return taskEntities.map(this.toDomain)
    }

    private toDomain(taskEntity: TaskEntity): Task {
        return new Task(
            taskEntity.id,
            taskEntity.description,
            TaskStatus[taskEntity.status],
            new Date(taskEntity.createdAt),
            taskEntity.updatedAt ? new Date(taskEntity.updatedAt) : null,
        )
    }

    private toEntity(task: Task): TaskEntity {
        return {
            id: task.id,
            description: task.getDescription(),
            status: TaskStatus[task.getStatus()] as keyof typeof TaskStatus,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.getUpdatedAt()?.toISOString() || null,
        }
    }

    private getDbContentRaw(): string | null {
        let content: string | null = null
        try {
            const fileDescriptor = fs.openSync(this.pathFile, 'r')
            content = fs.readFileSync(fileDescriptor).toString()
            fs.closeSync(fileDescriptor)
        } catch { /* empty */ }

        return content
    }

    private updateDbContentFromTasks(tasks: Task[]): void {
        this.updateDbContentRaw(tasks.map(this.toEntity))
    }

    private updateDbContentRaw(taskEntities: TaskEntity[]): void {
        const fileDescriptor = fs.openSync(this.pathFile, 'w+')
        fs.writeSync(fileDescriptor, JSON.stringify(taskEntities))
        fs.closeSync(fileDescriptor)
    }
}
