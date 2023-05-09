import { createServer } from "http"
import express from "express";
import { Server } from "socket.io"
import userRute from "./src/rutes/users.js"
import messageRute from "./src/rutes/messages.js"
import { NAME_ROOM } from "./src/Constants.js"
const app = express();
const httpServer = createServer(app);

app.get("/", (req, res) => {

    const datas = {
        client: process.env.CLIENT_URL,
        port: 4000
    }
    res.json(datas);


});
const io = new Server(httpServer, {

    cors: {
        origin: process.env.CLIENT_URL
    }
});
httpServer.get
io.on('connection', (socket) => {
    if (socket.recovered) {
        console.info("recovered connection   ---> " + socket.id)
    } else {
        socket.join(NAME_ROOM);
        userRute(socket, io)
        messageRute(socket, io)
    }
});

io.on("disconnect", (reason) => {
    socket.Disconnect()
    console.info("disconnection")
});

httpServer.listen(4000, () => {
    console.log('listening on *:4000 na d waiting client ' + process.env.CLIENT_URL)
});