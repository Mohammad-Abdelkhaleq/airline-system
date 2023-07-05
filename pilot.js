'use strict'
let eventspool=require('./events.js');
require('./manager.js');

eventspool.on('took off', (payload)=>{

    console.log(`pilot: the flight took off with ID ${payload.details.flightID} to ${payload.details.destination} has took off`, payload)
})


eventspool.on('order to taking off', (payload)=>{
    setTimeout(()=>{
        eventspool.emit('took off', payload);
    },4000);

    setTimeout(()=>{
        console.log(`pilot: the flight arrived with ID ${payload.details.flightID} to ${payload.details.destination} has arrived`, payload)
        eventspool.emit('arrived', payload);
    },7000);
})

