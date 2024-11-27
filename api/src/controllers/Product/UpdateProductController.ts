import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

async function UpdateProductController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdProduct } = request.params as { sequenceIdProduct: number };
        const { product, description, plant, value, unit, quantity } = request.body as { product?: string, description?: string, plant?: string, value?: number, unit?: string, quantity?: number }

        const productToUpdate = await Product.findOne({ sequenceIdProduct });

        if (!productToUpdate) {
            return reply.status(404).send({ error: "Produto não encontrado." });
        }

        if (product !== undefined) productToUpdate.product = product;
        if (description !== undefined) productToUpdate.description = description;
        if (plant !== undefined) productToUpdate.plant = plant;
        if (value !== undefined) {
            if (typeof value !== "number" || value < 0) {
                return reply.status(400).send({ error: "Valor deve ser um número positivo." });
            }
            productToUpdate.value = value;
        }
        if (unit !== undefined) productToUpdate.unit = unit;
        if (quantity !== undefined) {
            if (!Number.isInteger(quantity) || quantity < 0) {
                return reply.status(400).send({ error: "Quantidade deve ser um número inteiro positivo." });
            }
            productToUpdate.quantity = quantity;
        }

        const updatedProduct = await productToUpdate.save();

        return reply.status(201).send({
            message: "Product successfully updated",
            updatedProduct,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to updated product" });
    }
}

export { UpdateProductController }