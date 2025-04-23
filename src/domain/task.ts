export class Task {
    constructor(
        readonly id: string,
        private description: string,
        private status: TaskStatus,
        readonly createdAt: Date,
        private updatedAt: Date | null,
    ) {
    }

    updateDescription(description: string): void {
        this.description = description
        this.updatedAt = new Date()
    }

    updateStatus(status: TaskStatus): void {
        this.status = status
        this.updatedAt = new Date()
    }

    statusIs(statuses: TaskStatus[]): boolean {
        return statuses.indexOf(this.status) !== -1
    }

    getDescription(): string {
        return this.description
    }

    getStatus(): TaskStatus {
        return this.status
    }

    getUpdatedAt(): Date | null {
        return this.updatedAt
    }

    progress(): boolean {
        switch (this.status) {
            case TaskStatus.Todo:
                this.updateStatus(TaskStatus.InProgress)
                break
            case TaskStatus.InProgress:
                this.updateStatus(TaskStatus.Done)
                break
            default:
                return false
        }

        return true
    }
}

export enum TaskStatus {
    Todo,
    InProgress,
    Done,
}

export function generateTaskId(): string {
    const d = new Date()
    return [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
        d.getMilliseconds(),
    ].join('-')
}
