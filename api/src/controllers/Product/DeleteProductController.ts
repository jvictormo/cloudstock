import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";
import ProductStock from "../../models/ProductStockHistory";

async function DeleteProductController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdProduct } = request.params as { sequenceIdProduct: number };

        const deletedProduct = await Product.findOneAndDelete({ sequenceIdProduct });

        await ProductStock.deleteMany({ sequenceIdProduct })

        if (!deletedProduct) {
            return reply.status(404).send({ error: "Product not found" });
        }

        return reply.status(201).send({ message: "Product successfully deleted", });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to deleted product" });
    }
}

export { DeleteProductController }