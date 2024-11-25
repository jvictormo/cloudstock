import { FastifyRequest, FastifyReply } from "fastify";
import User from "../../models/User";

async function GetUserByIdController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdUser } = request.params as { sequenceIdUser: number };

        console.log(sequenceIdUser)

        const user = await User.findOne({ sequenceIdUser: Number(sequenceIdUser) });

        if(!user){
            return reply.status(404).send({ error: "User not found."})
        }

        return reply.status(200).send(user);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to get user" });
    }
}

export { GetUserByIdController }