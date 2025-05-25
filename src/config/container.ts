import { TaskRepositoryFileSystem } from "../infrastructure/taskRepositoryFileSystem"
import setupCreateTask from "../application/createTask"
import setupDeleteTask from "../application/deleteTask"
import setupFindTasks from "../application/findTasks"
import setupProgressTask from "../application/progressTask"
import setupUpdateTask from "../application/updateTask"

const taskRepository = new TaskRepositoryFileSystem(`${__dirname}/../../db/tasks.json`)

export const findTasks = setupFindTasks(taskRepository)
export const createTask = setupCreateTask(taskRepository)
export const progressTask = setupProgressTask(taskRepository)
export const updateTask = setupUpdateTask(taskRepository)
export const deleteTask = setupDeleteTask(taskRepository)
