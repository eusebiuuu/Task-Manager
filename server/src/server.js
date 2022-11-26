const app = require('./app');
const http = require('http');
const { connectToMongoDB } = require('./services/mongo');
require('dotenv').config();

const PORT = process.env.port || 8000;
const server = http.createServer(app);

async function startServer() {
    await connectToMongoDB();
    server.listen(PORT, () => {
        console.log('The server is listening...');
    });
}

startServer();