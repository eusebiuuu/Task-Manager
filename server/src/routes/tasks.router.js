const express = require('express');

const { httpGetAllTasks, httpGetOneTask, httpAddNewTask, httpSaveTask, httpDeleteTask } = require('./tasks.controller');

const tasksRouter = new express.Router();

tasksRouter.get('/', httpGetAllTasks);
tasksRouter.get('/:id', httpGetOneTask);
tasksRouter.post('/', httpAddNewTask);
tasksRouter.put('/:id', httpSaveTask);
tasksRouter.delete('/:id', httpDeleteTask);

module.exports = tasksRouter;