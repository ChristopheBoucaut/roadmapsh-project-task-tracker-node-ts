import { beforeAll, expect, test } from "vitest"
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory"
import { Task, TaskStatus } from "../domain/task"
import setupFindTasks from "./findTasks"

const taskInTodo = new Task('fake-id-todo', "", TaskStatus.Todo, new Date(), null)
const taskInDone = new Task('fake-id-done', "", TaskStatus.Done, new Date(), null)
let repository: TaskRepositoryInMemory

beforeAll(() => {
    repository = new TaskRepositoryInMemory()
    repository.save(taskInTodo)
    repository.save(taskInDone)
})

test("Find a task without filter", () => {
    const findTasks = setupFindTasks(repository)

    const response = findTasks({taskStatus: null})
    expect(response.tasks).toStrictEqual([taskInTodo, taskInDone])
})

test("Find a task with filter", () => {
    const findTasks = setupFindTasks(repository)

    const response = findTasks({taskStatus: TaskStatus.Todo})
    expect(response.tasks).toStrictEqual([taskInTodo])
})
