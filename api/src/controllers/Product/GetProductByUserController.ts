import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function GetProductByUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdUser } = request.params as { sequenceIdUser: number };

        const product = await Product.find({ sequenceIdUser: sequenceIdUser });

        return reply.status(299).send(product);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create product" });
    }
}

export { GetProductByUserController }