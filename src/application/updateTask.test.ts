import { expect, test } from "vitest"
import { Task, TaskStatus } from "../domain/task"
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory"
import { describe } from "node:test"
import { fail } from "assert"
import setupUpdateTask from "./updateTask"

test("Update description", () => {
    const taskId = 'fake-id'
    const newDescription = "Description updated"
    const repository = new TaskRepositoryInMemory()
    const updateTask = setupUpdateTask(repository)
    repository.save(new Task(taskId, "Initial description", TaskStatus.InProgress, new Date(), null))

    const response = updateTask({taskId: 'fake-id', newDescription: newDescription})
    expect(response.errorMsg).toBeNull()

    const task = repository.get(taskId)
    if (task === null) {
        fail("Task not found in repository, can't continue test")
    }
    expect(task.getDescription()).toBe(newDescription)
    expect(task.getUpdatedAt()).not.toBeNull()
})

describe("Can't update task", () => {
    test("if task doesn't exist", () => {
        const repository = new TaskRepositoryInMemory()
        const updateTask = setupUpdateTask(repository)

        const response = updateTask({taskId: 'fake-id', newDescription: ""})
        expect(response.errorMsg).toBe("Task not found for id fake-id")
    })
})