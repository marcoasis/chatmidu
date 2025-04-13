import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

console.log("log de prueba");

const port = process.env.port ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado!');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado!');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});




app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`);
    
})