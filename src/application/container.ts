import { TaskRepositoryFileSystem } from "../infrastructure/taskRepositoryFileSystem"
import CreateTask from "../usecase/createTask"
import DeleteTask from "../usecase/deleteTask"
import FindTasks from "../usecase/findTasks"
import ProgressTask from "../usecase/progressTask"
import UpdateTask from "../usecase/updateTask"

const taskRepository = new TaskRepositoryFileSystem(`${__dirname}/../../db/tasks.json`)

export const findTasks = new FindTasks(taskRepository)
export const createTask = new CreateTask(taskRepository)
export const progressTask = new ProgressTask(taskRepository)
export const updateTask = new UpdateTask(taskRepository)
export const deleteTask = new DeleteTask(taskRepository)
