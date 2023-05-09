import messageController from "../controllers/messages.js"
import { NAME_ROOM } from "../Constants.js"
const messageRute = (socket, io) => {

    socket.on('sendMesssage', async ({ user, message }) => {
        const messageCreated = await messageController.Create(user, message)
        io.to(NAME_ROOM).emit('reciveMessage', { id: user.socketId, nickName: user.nickName, message: messageCreated.message })
    })
}
export default messageRute