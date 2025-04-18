import { TaskRepositoryFileSystem } from "../infrastructure/taskRepositoryFileSystem"
import CreateTask from "../application/createTask"
import DeleteTask from "../application/deleteTask"
import FindTasks from "../application/findTasks"
import ProgressTask from "../application/progressTask"
import UpdateTask from "../application/updateTask"

const taskRepository = new TaskRepositoryFileSystem(`${__dirname}/../../db/tasks.json`)

export const findTasks = new FindTasks(taskRepository)
export const createTask = new CreateTask(taskRepository)
export const progressTask = new ProgressTask(taskRepository)
export const updateTask = new UpdateTask(taskRepository)
export const deleteTask = new DeleteTask(taskRepository)
