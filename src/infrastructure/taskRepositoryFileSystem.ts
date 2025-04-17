import { Task, TaskStatus } from "../domain/task"
import TaskRepository, { TaskRequest } from "../domain/taskRepository"
import fs from 'fs'

type TaskRaw = {
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

        return tasks.length === 1 ? tasks[0] : null
    }

    find(request: TaskRequest): Task[] {
        let tasks = this.getAllTasks()

        if (request.taskStatuses.length > 0) {
            tasks = tasks.filter((task: Task): Boolean => task.statusIs(request.taskStatuses))
        }
        if (request.taskIds.length > 0) {
            tasks = tasks.filter((task: Task): Boolean => request.taskIds.indexOf(task.id) !== -1)
        }

        return tasks
    }

    save(task: Task): void {
        const tasks = this.getAllTasks()
        let existPosition = null
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === task.id) {
                existPosition = i
                break
            }
        }
        if (existPosition !== null) {
            tasks[existPosition] = task
        } else {
            tasks.push(task)
        }

        this.updateDbContentFromTasks(tasks)
    }

    delete(taskOrTaskId: Task | string): Boolean
    {
        const taskIdToDelete = taskOrTaskId instanceof Task ? taskOrTaskId.id : taskOrTaskId
        const tasks = this.getAllTasks()
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === taskIdToDelete) {
                delete tasks[i]
                this.updateDbContentFromTasks(tasks.filter((task: Task): Boolean => task instanceof Task))
                return true
            }
        }

        return false
    }

    private getAllTasks(): Task[] {
        const contentRaw = this.getDbContentRaw()
        if (contentRaw === null) {
            return []
        }
        const taskRaws: TaskRaw[] = JSON.parse(contentRaw)

        return taskRaws.map(this.transformTaskRawToTask)
    }

    private transformTaskRawToTask(taskRaw: TaskRaw): Task {
        return new Task(
            taskRaw.id,
            taskRaw.description,
            TaskStatus[taskRaw.status],
            new Date(taskRaw.createdAt),
            taskRaw.updatedAt ? new Date(taskRaw.updatedAt) : null,
        )
    }

    private transformTaskToTaskRaw(task: Task): TaskRaw {
        return {
            id: task.id,
            description: task.getDescription(),
            status: TaskStatus[task.getStatus()] as keyof typeof TaskStatus,
            createdAt: task.createdAt.toString(),
            updatedAt: task.getUpdatedAt()?.toString() || null,
        }
    }

    private getDbContentRaw(): string | null {
        let content: string | null = null
        try {
            const fileDescriptor = fs.openSync(this.pathFile, 'r')
            content = fs.readFileSync(fileDescriptor).toString()
            fs.closeSync(fileDescriptor)
        } catch (error) {
        }

        return content
    }

    private updateDbContentFromTasks(tasks: Task[]): void {
        this.updateDbContentRaw(tasks.map(this.transformTaskToTaskRaw))
    }

    private updateDbContentRaw(taskRaws: TaskRaw[]): void {
        const fileDescriptor = fs.openSync(this.pathFile, 'w+')
        fs.writeSync(fileDescriptor, JSON.stringify(taskRaws))
        fs.closeSync(fileDescriptor)
    }
}
