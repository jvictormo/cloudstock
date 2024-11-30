import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";
import ProductStock from "../../models/ProductStockHistory";

async function UpdateProductStockController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdProduct } = request.params as { sequenceIdProduct: number };
        const { quantity } = request.body as { quantity?: number };

        const productToUpdate = await Product.findOne({ sequenceIdProduct });
        if (!productToUpdate) {
            return reply.status(404).send({ error: "Produto não encontrado." });
        }

        let removed: number | undefined;

        if (quantity !== undefined) {
            if (!Number.isInteger(quantity) || quantity < 0) {
                return reply.status(400).send({ error: "Quantidade deve ser um número inteiro positivo." });
            }

            removed = productToUpdate.quantity - quantity;

            productToUpdate.quantity = quantity;
        } else {
            return reply.status(400).send({ error: "Quantidade não foi fornecida." });
        }

        if (removed < 0) {
            return reply.status(400).send({ error: "A quantidade removida não pode resultar em um valor negativo." });
        }

        const stockData = {
            sequenceIdUser: productToUpdate.sequenceIdUser,
            sequenceIdProduct,
            removed,
        };

        console.log("Criando ProductStock com os dados:", stockData);

        await ProductStock.create(stockData);

        const updatedProduct = await productToUpdate.save();

        return reply.status(200).send({
            message: "Produto atualizado com sucesso",
            updatedProduct,
        });
    } catch (error) {
        console.error("Erro na função UpdateProductStockController:", error);
        return reply.status(500).send({ error: "Erro ao tentar atualizar o produto." });
    }
}

export { UpdateProductStockController };
