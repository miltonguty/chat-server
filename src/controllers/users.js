import { PrismaClient } from '@prisma/client'

const GetUserConnected = async () => {
    const prisma = new PrismaClient()
    const user = await prisma.user.findMany({
        where: {
            active: true
        },
    })
    return user
}

const Create = async (socketId, nickName) => {
    const prisma = new PrismaClient()
    const user = await prisma.user.create({
        data: {
            nickName: nickName,
            socketId: socketId
        },
    })
    return user
}
const Disconnect = async (socketId) => {
    const prisma = new PrismaClient()
    let user = await prisma.user.findFirst({
        where: { socketId: socketId }
    })
    user = await prisma.user.update({
        where: { id: user.id },
        data: {
            active: false
        },
    })
    return user
}
export default {
    Create, Disconnect, GetUserConnected
}