import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function GetProductWithStockController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdUser } = request.params as { sequenceIdUser: number };

        const product = await Product.find({ sequenceIdUser: sequenceIdUser, quantity: { $gte: 1 } });

        return reply.status(200).send(product);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create product" });
    }
}

export { GetProductWithStockController }