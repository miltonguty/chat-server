import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const GetAllMessagesOfUserConnected = async () => {
    const user = await prisma.user.findMany({
        where: {
            active: true
        },
        include: {
            messages: true
        }
    })
    return user
}

const Create = async (user, message) => {
    const messageCreated = await prisma.messages.create({
        data: {
            message: message,
            userId: user.id
        },
    })
    console.log(messageCreated)
    return messageCreated
}
export default { Create, GetAllMessagesOfUserConnected }