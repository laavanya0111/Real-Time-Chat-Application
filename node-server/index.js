// const http = require('http');
// const io = require('socket.io')(8000, { 
//     cors: {
//         origin: "http://127.0.0.1:5500", // Add your client's port here
//         methods: ["GET", "POST"]
//     }
// });

// const server = http.createServer();
// //const socket = io(server);

// //const socket = io('http://localhost:8000');
// const users = {};

// io.on('connection', socket => {
//     //const transport = socket.io.engine.transport.name;
//     socket('new-user-joined', name => {
//         console.log("New user",name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name)
//     })

//     socket.on('send', message=>{
//         socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
//     })
// })

// server.listen(8000, () => {
//     console.log('Socket.IO server listening on port 8000');
//   });

const http = require('http');
const io = require('socket.io');
const server = http.createServer();
const socket = io(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

const users = {};

socket.on('connection', socket => {
    socket.on('new-user-joined', name => {
        //console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id] );
        delete users[socket.id];
    });
});

server.listen(8000, () => {
    console.log('Socket.IO server listening on port 8000');
});