const express = require('express')
const bodyParser = require('body-parser')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 8000

app.use(bodyParser.json())

const adapter = new FileSync('db.json')
const db = lowdb(adapter)

db.defaults({ users: [] }).write()

io.on('connection', socket => {
    console.log(socket)
    socket.on('test', () => {
        console.log('test')
        socket.emit('test')
    })

})

server.listen(port, () => console.log('listening on port ' + port))
