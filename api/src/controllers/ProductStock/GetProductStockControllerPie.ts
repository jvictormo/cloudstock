// src/controllers/GetProductStockControllerPie.ts

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
    totalRemoved: number;
}

interface IPieChartData {
    id: number;
    value: number;
    label: string;
}

async function GetProductStockControllerPie(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sequenceIdUser } = request.params as { sequenceIdUser: number };

        // Buscar todos os registros de estoque e produtos para o usuário
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

        // Iterar sobre os produtos e incluir apenas aqueles com registros de estoque
        const mergedProducts: IMergedProduct[] = products
            .filter(prod => productStockMap.has(prod.sequenceIdProduct)) // Apenas produtos com estoque
            .map((prod) => {
                const stocks = productStockMap.get(prod.sequenceIdProduct) || [];
                const totalRemoved = stocks.reduce((sum, stock) => sum + stock.removed, 0); // Somar 'removed'

                return {
                    ...prod,
                    totalRemoved: totalRemoved
                };
            });

        // Mapear os produtos para a estrutura desejada do PieChart
        const pieChartData: IPieChartData[] = mergedProducts.map((prod) => ({
            id: prod.sequenceIdProduct,
            value: prod.totalRemoved,
            label: prod.product
        }));

        return reply.status(200).send(pieChartData);
    } catch (error) {
        console.error("Erro no GetProductStockControllerPie:", error);
        return reply.status(500).send({ error: "Erro ao tentar recuperar os produtos e estoques." });
    }
}

export { GetProductStockControllerPie };