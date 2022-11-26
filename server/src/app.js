const express = require('express');
const path = require('path');
const tasksRouter = require('./routes/tasks.router');

const app = express();

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use((err, req, res, next) => {
    console.log(err);
})
app.use(express.static(path.join(__dirname, '..', '..', 'client')));
app.use('/api/tasks', tasksRouter);

app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
});

module.exports = app;