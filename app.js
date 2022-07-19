"use strict"
const express = require('express');
const http = require('http');
const ioSoc = require('socket.io');
const SocServer = ioSoc.Server
const app = express()
const httpServer = http.createServer(app);
const io = new SocServer(httpServer, {
    cors: {
        origin: "*" //allowing cors from anywhere
    }
});

app.get("/",(req,res)=>{
    res.send("socket server")
})


const orderNamespace = io.of("/orders");
const farmSocket = io.of("/farms")



orderNamespace.use((socket, next) => {
    // ensure the socket has access to the "orders" namespace, and then
    next();
});

orderNamespace.on("connection", (socket) => {
   console.log("user is trying to make an order")
});

farmSocket.on("connection", (socket) => {
    console.log("farmer joined")
    
});




io.on('connection', (socket) => {
    console.log("a user joined!!")
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on("chat", (message) => {
        io.emit("chat", message)
    })
});

httpServer.listen(5000, () => {
    console.log("running")
});
