import { afterAll, describe, expect, test } from "@jest/globals";
import fs from 'fs'
import { TaskRepositoryFileSystem } from "./taskRepositoryFileSystem";
import { Task, TaskStatus } from "../domain/task";
import { TaskRequest } from "../domain/taskRepository";

const d = new Date()
const filename = [
    'test-task-repository',
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds(),
].join('-')
const pathFile = `${__dirname}/../../db/${filename}.json`
const repository = new TaskRepositoryFileSystem(pathFile)

const expectedTask1 = new Task('task-1', "Initial description", TaskStatus.Todo, new Date(), null)
const expectedTask2 = new Task('task-2', "Initial description", TaskStatus.Todo, new Date(), null)

afterAll(() => {
    fs.rmSync(pathFile)
})

describe("Test cycle of life", () => {
    test("Save new tasks", () => {
        repository.save(expectedTask1)
        repository.save(expectedTask2)
    })

    test("Get task", () => {
        const task1 = repository.get(expectedTask1.id)
        const task2 = repository.get(expectedTask2.id)
        const taskUnknown = repository.get('unknown-id')

        expect(task1).toStrictEqual(expectedTask1)
        expect(task2).toStrictEqual(expectedTask2)
        expect(taskUnknown).toBeNull()
    })

    test("Update task", () => {
        expectedTask2.updateStatus(TaskStatus.InProgress)
        repository.save(expectedTask2)
        const task2 = repository.get(expectedTask2.id)
        expect(task2).toStrictEqual(expectedTask2)
    })

    test("Find tasks without filter", () => {
        const tasks = repository.find(new TaskRequest())
        expect(tasks).toStrictEqual([expectedTask1, expectedTask2])
    })

    test("Find tasks with filter on one status", () => {
        const tasks = repository.find(new TaskRequest(
            [TaskStatus.InProgress]
        ))
        expect(tasks).toStrictEqual([expectedTask2])
    })

    test("Find tasks with filter on 2 statuses", () => {
        const tasks = repository.find(new TaskRequest(
            [TaskStatus.InProgress, TaskStatus.Todo]
        ))
        expect(tasks).toStrictEqual([expectedTask1, expectedTask2])
    })

    test("Find tasks with filter on 2 statuses and 1 id", () => {
        const tasks = repository.find(new TaskRequest(
            [TaskStatus.InProgress, TaskStatus.Todo],
            [expectedTask1.id]
        ))
        expect(tasks).toStrictEqual([expectedTask1])
    })

    test("Find tasks with filter on 2 statuses and 3 ids", () => {
        const tasks = repository.find(new TaskRequest(
            [TaskStatus.InProgress, TaskStatus.Todo],
            [expectedTask1.id, expectedTask2.id, 'unknown-id']
        ))
        expect(tasks).toStrictEqual([expectedTask1, expectedTask2])
    })

    test("Delete unknown task", () => {
        expect(repository.delete('unknown-task')).toBeFalsy()
    })

    test("Delete by id", () => {
        expect(repository.delete(expectedTask1.id)).toBeTruthy()
        expect(repository.get(expectedTask1.id)).toBeNull()
    })

    test("Delete by object", () => {
        expect(repository.delete(expectedTask2)).toBeTruthy()
        expect(repository.get(expectedTask2.id)).toBeNull()
    })
})