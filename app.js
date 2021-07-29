require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http')
const  server = http.createServer(app)
const path = require('path');
const io = require('socket.io')(server)

const port = process.env.PORT || 5000
app.use(express.static(path.join(__dirname, 'public')))


let connectedSocket = new Set()

io.on('connection', (socket) => {
    console.log('user is connected')
    console.log(socket.id) 
    connectedSocket.add(socket.id)
    io.emit('client-Total',connectedSocket.size )

    socket.on('sendmessage', message => {
        socket.broadcast.emit('messagereceive', message)
    })

    socket.on('feedback', message => {
        socket.broadcast.emit('feedback', message)
    })


    socket.on('disconnect' , () => {
        console.log('user is disconnected')
        connectedSocket.delete(socket.id)
        io.emit('client-Total',connectedSocket.size )

      
    })
})

server.listen(port, () => console.log(`listening on port ${port}`))
