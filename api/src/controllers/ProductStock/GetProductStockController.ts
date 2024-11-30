import { FastifyRequest, FastifyReply } from "fastify";
import ProductStock from "../../models/ProductStockHistory";
import Product from "../../models/Product";

interface IProduct {
    sequenceIdProduct: number;
    sequenceIdUser: number;
    product: string;
    description: string;
    plant: string;
    value: number;
    unit: string;
    quantity: number;
}

interface IProductStock {
    sequenceIdProductStock: number;
    sequenceIdUser: number;
    sequenceIdProduct: number;
    date: Date;
    removed: number;
}

interface IMergedProduct extends IProduct {
    stock: IProductStock[];
}

async function GetProductStockController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdUser } = request.params as { sequenceIdUser: number };

        const [productStock, products] = await Promise.all([
            ProductStock.find({ sequenceIdUser: sequenceIdUser }).lean<IProductStock[]>(),
            Product.find({ sequenceIdUser: sequenceIdUser }).lean<IProduct[]>()
        ]);

        const productStockMap = new Map<number, IProductStock[]>();
        productStock.forEach((stock) => {
            if (!productStockMap.has(stock.sequenceIdProduct)) {
                productStockMap.set(stock.sequenceIdProduct, []);
            }
            productStockMap.get(stock.sequenceIdProduct)!.push(stock);
        });

        const mergedProducts: IMergedProduct[] = products.map((prod) => {
            const stocks = productStockMap.get(prod.sequenceIdProduct) || [];
            return {
                ...prod,
                stock: stocks
            };
        });

        return reply.status(200).send(mergedProducts);
    } catch (error) {
        console.error("Erro no GetProductStockController:", error);
        return reply.status(500).send({ error: "Erro ao tentar recuperar os produtos e estoques." });
    }
}

export { GetProductStockController };
