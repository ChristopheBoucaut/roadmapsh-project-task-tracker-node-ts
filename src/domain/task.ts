export class Task {
    readonly id: string

    constructor(
        id: string | null,
        private description: string,
        private status: TaskStatus,
        readonly createdAt: Date,
        private updatedAt: Date | null,
    ) {
        this.id = id || generateId()
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
}

export enum TaskStatus {
    Todo,
    InProgress,
    Done,
}

function generateId(): string {
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
