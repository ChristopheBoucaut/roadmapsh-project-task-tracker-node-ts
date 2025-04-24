import { expect, test } from "vitest"
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory"
import CreateTask, { CreateTaskRequest } from "./createTask"
import { TaskStatus } from "../domain/task"

test("Create a new task", () => {
    const description = "A description"
    const repository = new TaskRepositoryInMemory()
    const createTask = new CreateTask(repository)

    const response = createTask.execute(new CreateTaskRequest(description))

    expect(response.task.id).toMatch(/.+/)
    expect(response.task.getDescription()).toBe(description)
    expect(response.task.getStatus()).toBe(TaskStatus.Todo)
    expect(response.task.createdAt).not.toBeNull()
    expect(response.task.getUpdatedAt()).toBeNull()
    expect(repository.get(response.task.id)).toBe(response.task)
})
