import { expect, test } from "@jest/globals";
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory";
import { Task, TaskStatus } from "../domain/task";
import DeleteTask, { DeleteTaskRequest } from "./deleteTask";

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
    const deleteTask = new DeleteTask(repository)

    const responseForExistingTask = deleteTask.execute(new DeleteTaskRequest(task.id))
    expect(responseForExistingTask.deleted).toBeTruthy()
    expect(repository.get(task.id)).toBeNull()

    const responseForUnexistingTask = deleteTask.execute(new DeleteTaskRequest(task.id))
    expect(responseForUnexistingTask.deleted).toBeFalsy()
})
