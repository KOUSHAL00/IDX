import express from 'express';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';
import apiRouter from './routes/index.js'; 
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import chokidar from 'chokidar'; // For file watching
import path from 'path'; // For handling file paths
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*', // Allow all origins for simplicity, adjust as needed
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
}); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id); 

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

});


const editorNamespace = io.of('/editor');
// Namespace for editor-related socket connections
// This allows you to handle editor-specific events separately

editorNamespace.on('connection', (socket) => {
    
    console.log("Editor connected");

    //get project id from the frontend
    let projectId = socket.handshake.query['projectId'];

    console.log("Project ID received after connection:", projectId);

    if(projectId)
    {
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored:(path)=>path.includes('node_modules'),
            persistent: true, //keeps watcher in runnning state till the time app is running

            awaitWriteFinish: {
                stabilityThreshold: 2000, // Wait for 2 seconds of inactivity before triggering
            },
            ignoreInitial: true // Ignore initial files from the directory
        });
        
        // Log when a file is added, changed, or removed
        watcher.on('all', (event, filePath) => {
            console.log(`File ${filePath} has been ${event}`);
        });

    }
    
    handleEditorSocketEvents(socket,editorNamespace); // Handle editor-specific socket events

    socket.on('disconnect', async() => {
        await watcher.close(); // Close the watcher when the socket disconnects
        console.log('Editor disconnected');
    });

});   


app.use('/api',apiRouter);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });