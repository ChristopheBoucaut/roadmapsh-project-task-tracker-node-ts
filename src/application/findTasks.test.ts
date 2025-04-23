import { beforeAll, expect, test } from "@jest/globals";
import { TaskRepositoryInMemory } from "../../test/mocks/taskRepositoryInMemory";
import { Task, TaskStatus } from "../domain/task";
import FindTasks, { FindTasksRequest } from "./findTasks";

const taskInTodo = new Task('fake-id-todo', "", TaskStatus.Todo, new Date(), null)
const taskInDone = new Task('fake-id-done', "", TaskStatus.Done, new Date(), null)
let repository: TaskRepositoryInMemory

beforeAll(() => {
    repository = new TaskRepositoryInMemory()
    repository.save(taskInTodo)
    repository.save(taskInDone)
});

test("Find a task without filter", () => {
    const findTasks = new FindTasks(repository)

    const response = findTasks.execute(new FindTasksRequest(null))
    expect(response.tasks).toStrictEqual([taskInTodo, taskInDone])
})

test("Find a task with filter", () => {
    const findTasks = new FindTasks(repository)

    const response = findTasks.execute(new FindTasksRequest(TaskStatus.Todo))
    expect(response.tasks).toStrictEqual([taskInTodo])
})
