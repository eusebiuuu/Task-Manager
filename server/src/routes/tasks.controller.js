const { getAllTasks, getOneTask, addNewTask, saveTask, deleteTask } = require("../models/tasks.model");

async function httpGetAllTasks(req, res) {
    return res.status(200).json(await getAllTasks());
}

async function httpGetOneTask(req, res, next) {
    const params = req.params;
    const taskID = Number(params.id);
    const response = await getOneTask(taskID);
    if (!response.ok) {
        const err = new Error(response.error);
        next(err);
        return;
        // return res.status(404).send(`<h1>${response.error}</h1>`);
    }
    // next();
    return res.status(200).json(response.content);
}

async function httpAddNewTask(req, res) {
    const task = req.body;
    const response = await addNewTask(task);
    if (response.ok) {
        return res.status(201).json(response.content);
    }
    return res.status(400).json(response.error);
}

async function httpSaveTask(req, res) {
    const params = req.params;
    const id = params.id;
    const task = {...req.body, id: id};
    const response = await saveTask(task);
    if (response.ok) {
        return res.status(200).json(response.content);
    }
    return res.status(400).json(response.error);
}

async function httpDeleteTask(req, res) {
    const params = req.params;
    const taskID = Number(params.id);
    const response = await deleteTask(taskID);
    if (response.ok) {
        return res.status(200).json(response.content);
    }
    return res.status(400).json(response.error);
}

module.exports = {
    httpAddNewTask,
    httpDeleteTask,
    httpGetAllTasks,
    httpGetOneTask,
    httpSaveTask,
}