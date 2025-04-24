import { TaskStatus } from "../domain/task"
import { createTask, deleteTask, findTasks, progressTask, updateTask } from "../config/container"
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const actions: Record<string, () => void> = {
    'add': addAction,
    'update': updateAction,
    'delete': deleteAction,
    'progress': progressAction,
    'list': listAction,
    'stop': () => rl.close(),
}

askAction()

function askAction(): void {
    rl.question(`Which action : ${Object.keys(actions).join(', ')}\n`, (answer: string) => {
        if (actions[answer] === undefined) {
            rl.write(`${answer} isn't valid action\n`)
            askAction()
            return
        }
        cleanOutput()
        actions[answer]()
    })
}

function addAction(): void {
    rl.question(`Enter description :\n`, (description: string) => {
        const response = createTask({description})
        rl.write(`Task created with id ${response.task.id}\n`)
        askAction()
    })
}

function updateAction(): void {
    rl.question(`Which task to change ?\n`, (taskId: string) => {
        rl.question(`New description: \n`, (newDescription: string) => {
            cleanOutput()

            const response = updateTask({taskId, newDescription})
            if (response.errorMsg) {
                rl.write(`Can't update description for ${taskId}: ${response.errorMsg}\n`)
            } else {
                rl.write(`Description updated for ${taskId}\n`)
            }

            askAction()
        })
    })
}

function listAction(): void {
    const statusFilters: string[] = [
        'all',
        ...Object.values(TaskStatus)
            .filter((status): boolean => typeof status === 'string') as string[]
    ]
    rl.question(`Filter on status : ${statusFilters.join(', ')} \n`, (filter: string) => {
        cleanOutput()

        const request = {
            taskStatus: Object.keys(TaskStatus).indexOf(filter) !== -1 ?
                TaskStatus[filter as keyof typeof TaskStatus] :
                null
        }

        const response = findTasks(request)

        if (response.tasks.length === 0) {
            rl.write(`no tasks found\n`)
        } else {
            response.tasks.forEach(task => {
                rl.write(`* [${task.id}] ${task.getDescription()}\n`)
            })
        }

        askAction()
    })
}

function progressAction(): void {
    rl.question(`Which task to progress ?\n`, (taskId: string) => {
        cleanOutput()

        const response = progressTask({taskId})
        if (response.errorMsg) {
            rl.write(`Can't progress task ${taskId}: ${response.errorMsg}\n`)
        } else {
            rl.write(`New status for ${taskId}: ${response.newStatus}\n`)
        }

        askAction()
    })
}

function deleteAction(): void {
    rl.question(`Which task to delete ?\n`, (taskId: string) => {
        cleanOutput()

        const response = deleteTask({taskId})
        if (response.deleted) {
            rl.write(`Task ${taskId} deleted\n`)
        } else {
            rl.write(`Can't delete task ${taskId}\n`)
        }

        askAction()
    })
}

function cleanOutput() {
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
}
