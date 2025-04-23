import {describe, expect, test} from '@jest/globals';
import { generateTaskId, Task, TaskStatus } from './task';

describe("Check construct and getters", () => {
    test("With minimal informations", () => {
        const description = "A description"
        const status = TaskStatus.InProgress
        const createdAt = new Date()

        const task = new Task(
            generateTaskId(),
            description,
            status,
            createdAt,
            null
        )

        expect(task.id).not.toBe('')
        expect(task.getDescription()).toBe(description)
        expect(task.getStatus()).toBe(status)
        expect(task.createdAt).toBe(createdAt)
        expect(task.getUpdatedAt()).toBeNull()
    })

    test("With full informations", () => {
        const id = generateTaskId()
        const description = "A description"
        const status = TaskStatus.InProgress
        const createdAt = new Date()
        const updatedAt = new Date()

        const task = new Task(
            id,
            description,
            status,
            createdAt,
            updatedAt
        )

        expect(task.id).toBe(id)
        expect(task.getDescription()).toBe(description)
        expect(task.getStatus()).toBe(status)
        expect(task.createdAt).toBe(createdAt)
        expect(task.getUpdatedAt()).toBe(updatedAt)
    })
})

test("status is", () => {
    const task = new Task(
        generateTaskId(),
        "",
        TaskStatus.Todo,
        new Date(),
        null
    )

    expect(task.statusIs([TaskStatus.Todo])).toBeTruthy()
    expect(task.statusIs([TaskStatus.Todo, TaskStatus.Done])).toBeTruthy()
    expect(task.statusIs([TaskStatus.Done])).toBeFalsy()
})

test("update description", () => {
    const task = new Task(
        generateTaskId(),
        "",
        TaskStatus.Todo,
        new Date(),
        null
    )

    const newDescription = "Description updated"
    task.updateDescription(newDescription)

    expect(task.getDescription()).toBe(newDescription)
    expect(task.getUpdatedAt()).toBeInstanceOf(Date)
})

test("update status", () => {
    const task = new Task(
        generateTaskId(),
        "",
        TaskStatus.Todo,
        new Date(),
        null
    )

    task.updateStatus(TaskStatus.Done)

    expect(task.getStatus()).toBe(TaskStatus.Done)
    expect(task.getUpdatedAt()).toBeInstanceOf(Date)
})

test("progress task", () => {
    const task = new Task(
        generateTaskId(),
        "",
        TaskStatus.Todo,
        new Date(),
        null
    )

    expect(task.progress()).toBeTruthy()
    expect(task.progress()).toBeTruthy()
    expect(task.progress()).toBeFalsy()
})
