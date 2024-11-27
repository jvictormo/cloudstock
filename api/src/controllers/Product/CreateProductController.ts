import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function CreateProductController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdUser, product, description, plant, value, unit, quantity  } = request.body as { sequenceIdUser: number, product: string, description: string, plant: string, value: number, unit: string, quantity: number };

        if (!product || !description || !plant || !value || !unit || !quantity ) {
            return reply.status(400).send({ error: "Preencha todos os campos." });
        }

        const existingProduct = await Product.findOne({ product, sequenceIdUser });
        if (existingProduct) {
            return reply.status(400).send({ error: "Produto já registrado." });
        }

        const productCreated = await Product.create({ sequenceIdUser, product, description, plant, value, unit, quantity });

        return reply.status(201).send({
            message: "Product successfully created",
            productCreated,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create product" });
    }
}

export { CreateProductController }