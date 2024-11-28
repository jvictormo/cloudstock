import { FastifyRequest, FastifyReply } from "fastify";
import Product from "../../models/Product";

interface ProductInterface {
    sequenceIdUser: number;
    product: string;
    description: string;
    plant: string;
    value: number;
    unit: string;
    quantity: number;
}

async function CreateBulkProductsController(request: FastifyRequest, reply: FastifyReply) {
    const { products } = request.body as { products: ProductInterface[] };

    if (!products || products.length === 0) {
        return reply.status(400).send({ error: "No products provided." });
    }

    const createdProducts: any[] = [];
    const errors: string[] = [];

    for (const Eachproduct of products) {
        const { sequenceIdUser, product, description, plant, value, unit, quantity } = Eachproduct;

        if (!product || !description || !plant || !value || !unit || !quantity) {
            errors.push(`Produto ${product} não tem todos os campos preenchidos.`);
            continue;
        }

        try {
            const existingProduct = await Product.findOne({ product, sequenceIdUser });
            if (existingProduct) {
                errors.push(`Produto ${product} já registrado.`);
                continue;
            }

            const productCreated = await Product.create({
                sequenceIdUser,
                product,
                description,
                plant,
                value,
                unit,
                quantity,
            });

            createdProducts.push(productCreated);
        } catch (error) {
            console.error('Erro ao criar o produto:', error);
            errors.push(`Erro ao criar o produto ${product}.`);
        }
    }

    if (errors.length > 0) {
        return reply.status(400).send({ error: errors });
    }

    return reply.status(201).send({
        message: "Produtos criados com sucesso.",
        createdProducts,
    });
}

export { CreateBulkProductsController };