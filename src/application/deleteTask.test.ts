import { expect, test } from "vitest"
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory"
import { Task, TaskStatus } from "../domain/task"
import setupDeleteTask from "./deleteTask"

test("Delete a task", () => {
    const task = new Task(
        'fake-id',
        "",
        TaskStatus.Todo,
        new Date(),
        null
    )

    const repository = new TaskRepositoryInMemory()
    repository.save(task)
    const deleteTask = setupDeleteTask(repository)

    const responseForExistingTask = deleteTask({taskId: task.id})
    expect(responseForExistingTask.deleted).toBeTruthy()
    expect(repository.get(task.id)).toBeNull()

    const responseForUnexistingTask = deleteTask({taskId: task.id})
    expect(responseForUnexistingTask.deleted).toBeFalsy()
})
