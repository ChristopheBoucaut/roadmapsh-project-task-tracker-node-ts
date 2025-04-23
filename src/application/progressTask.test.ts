import { expect, test } from "@jest/globals";
import { Task, TaskStatus } from "../domain/task";
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory";
import ProgressTask, { ProgressTaskRequest } from "./progressTask";
import { describe } from "node:test";

describe("Progress task", () => {
    test("Todo to InProgress", () => {
        const taskId = 'fake-id'
        const repository = new TaskRepositoryInMemory()
        const progressTask = new ProgressTask(repository)
        repository.save(new Task(taskId, "", TaskStatus.Todo, new Date(), null))

        const response = progressTask.execute(new ProgressTaskRequest(taskId))
        expect(response.newStatus).toBe(TaskStatus.InProgress)
        expect(response.errorMsg).toBeNull()
        expect(repository.get(taskId)?.getStatus()).toBe(TaskStatus.InProgress)
    })

    test("InProgress to Done", () => {
        const taskId = 'fake-id'
        const repository = new TaskRepositoryInMemory()
        const progressTask = new ProgressTask(repository)
        repository.save(new Task(taskId, "", TaskStatus.InProgress, new Date(), null))

        const response = progressTask.execute(new ProgressTaskRequest(taskId))
        expect(response.newStatus).toBe(TaskStatus.Done)
        expect(response.errorMsg).toBeNull()
        expect(repository.get(taskId)?.getStatus()).toBe(TaskStatus.Done)
    })
})

describe("Can't progress task", () => {
    test("if task doesn't exist", () => {
        const repository = new TaskRepositoryInMemory()
        const progressTask = new ProgressTask(repository)

        const response = progressTask.execute(new ProgressTaskRequest('fake-id'))
        expect(response.newStatus).toBeNull()
        expect(response.errorMsg).toBe("Task not found for id fake-id")
    })

    test("if task is Done", () => {
        const taskId = 'fake-id'
        const repository = new TaskRepositoryInMemory()
        const progressTask = new ProgressTask(repository)
        repository.save(new Task(taskId, "", TaskStatus.Done, new Date(), null))

        const response = progressTask.execute(new ProgressTaskRequest(taskId))
        expect(response.newStatus).toBeNull()
        expect(response.errorMsg).toBe("Task is done, you can't advance it for id fake-id")
    })
})