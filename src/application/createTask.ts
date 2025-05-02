import { generateTaskId, Task, TaskStatus } from "../domain/task"
import TaskRepository from "../domain/taskRepository"

export default function setupCreateTask(taskRepository: TaskRepository): (request: CreateTaskRequest) => CreateTaskResponse {
    return (request: CreateTaskRequest): CreateTaskResponse => {
        const task = new Task(
            generateTaskId(),
            request.description,
            TaskStatus.Todo,
            new Date(),
            null
        )
        taskRepository.save(task)

        return {task}
    }
}

type CreateTaskRequest = Readonly<{
    description: Task['description'],
}>

type CreateTaskResponse = Readonly<{
    task: Task,
}>
