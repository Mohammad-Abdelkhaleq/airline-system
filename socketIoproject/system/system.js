'use strict'
// require('./manager.js');
// require('./pilot.js');
// let eventspool=require('./events.js');

require('dotenv').config();
const port = process.env.PORT;
// const port = 3000;
console.log('i am in system');
const ioServer = require('socket.io')(port);
ioServer.on('connection', (socket) => {
    
    console.log('client connected to socket server', socket.id);
    // socket.on('hi', (payload) => {
    //     console.log('heard', payload);
    // });

    socket.on('new-flight', (payload) => {
        console.log('heard', payload);
        
        // socket.broadcast.emit('newflight', payload);
        ioServer.emit('newflight', payload);
    });

    socket.on ('arrived', (payload) => {
        socket.broadcast.emit('arrived', payload);
    });



});

const airline=ioServer.of('/pilot');

airline.on('connection', (socket) => {
    console.log('client connected to pilot namespace', socket.id);
    socket.on('took off', (payload) => {
        console.log(`the flight took off with ID ${payload.details.flightID} to ${payload.details.destination} has took off`, payload)
    });
} );