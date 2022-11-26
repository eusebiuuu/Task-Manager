const tasks = require('./tasks.mongo');

const FIRST_TASK_ID = 0;

function isValid(task) {
    if (!task || !task.id || !task.title) {
        return false;
    }
    return true;
}

async function saveTask(task) {
    if (!isValid(task)) {
        return {
            ok: false,
            error: 'Invalid task content',
        }
    }
    await tasks.findOneAndUpdate({
        id: task.id,
    }, task, {
        upsert: true,
    });
    return {
        ok: true,
        content: task,
    };
}

async function getLastTaskID() {
    const lastTask = await tasks.findOne({}).sort('-id');
    if (lastTask) {
        return lastTask.id;
    }
    return FIRST_TASK_ID;
}

async function addNewTask(incompleteTask) {
    const task = {...incompleteTask, id: (await getLastTaskID()) + 1};
    return await saveTask(task);
}

async function getAllTasks() {
    const allTasks = await tasks.find({}, {
        '_id': 0,
        '__v': 0,
    })
    .sort({
        id: 1,
    });
    return allTasks;
}

async function getOneTask(taskID) {
    if (isNaN(taskID) || taskID < 1 || taskID > await getLastTaskID()) {
        // console.log(taskID);
        return {
            ok: false,
            error: 'Invalid task ID',
        }
    }
    const task = await tasks.find({
        id: taskID,
    }, {
        '_id': 0,
        '__v': 0,
    });
    return {
        ok: true,
        content: task,
    };
}

async function deleteTask(taskID) {
    if (isNaN(taskID) || taskID < 1 || taskID > await getLastTaskID()) {
        return {
            ok: false,
            error: 'Invalid task ID',
        }
    }
    const res = await tasks.deleteOne({
        id: taskID,
    });
    if (res.deletedCount !== 1) {
        return {
            ok: false,
            error: 'Incorrect number of deleted items'
        }
    }
    return {
        ok: true,
        content: 'Task deleted successfully',
    }
}

module.exports = {
    getAllTasks,
    getOneTask,
    deleteTask,
    saveTask,
    addNewTask,
}