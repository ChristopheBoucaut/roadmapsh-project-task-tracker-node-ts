import { expect, test } from "vitest"
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory"
import { TaskStatus } from "../domain/task"
import setupCreateTask from "./createTask"

test("Create a new task", () => {
    const description = "A description"
    const repository = new TaskRepositoryInMemory()
    const createTask = setupCreateTask(repository)

    const response = createTask({description})

    expect(response.task.id).toMatch(/.+/)
    expect(response.task.getDescription()).toBe(description)
    expect(response.task.getStatus()).toBe(TaskStatus.Todo)
    expect(response.task.createdAt).not.toBeNull()
    expect(response.task.getUpdatedAt()).toBeNull()
    expect(repository.get(response.task.id)).toBe(response.task)
})
