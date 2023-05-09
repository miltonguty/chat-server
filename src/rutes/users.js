import userController from "../controllers/users.js"
import { NAME_ROOM } from "../Constants.js"
const userRute = (socket, io) => {
    socket.on('disconnect', async () => {
        await userController.Disconnect(socket.id)
        const listUser = await userController.GetUserConnected()
        io.to(NAME_ROOM).emit('reciveUsers', listUser);
        console.log('DISCONNESSO!!! ' + socket.id);
    })

    socket.on('registre', async (nickName) => {
        const user = await userController.Create(socket.id, nickName)
        io.to(socket.id).emit('newUser', user);
        const listUser = await userController.GetUserConnected()
        io.to(NAME_ROOM).emit('reciveUsers', listUser);

    })

}
export default userRute