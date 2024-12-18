import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { GetUserByIdController } from "./controllers/User/GetUserByIdController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { LoginUserController } from "./controllers/User/LoginUserController";
import { VerifyTokenAndFetchUser } from "./controllers/User/VerifyTokenAndFetchUser";
import { GetProductByUserController } from "./controllers/Product/GetProductByUserController";
import { DeleteProductController } from "./controllers/Product/DeleteProductController";
import { CreateProductController } from "./controllers/Product/CreateProductController";
import { UpdateProductController } from "./controllers/Product/UpdateProductController";
import { CreateBulkProductsController } from "./controllers/Product/CreateBulkProductsController";
import { GetProductWithStockController } from "./controllers/Product/GetProductWithStockController";
import { GetProductStockController } from "./controllers/ProductStock/GetProductStockController";
import { UpdateProductStockController } from "./controllers/Product/UpdateProductStockController";
import { GetProductStockControllerPie } from "./controllers/ProductStock/GetProductStockControllerPie";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/user/:sequenceIdUser", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetUserByIdController(request, reply)
    })
    fastify.post("/user/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreateUserController(request, reply)
    })
    fastify.get("/user/login/:email/:password/:rememberMe", async (request: FastifyRequest, reply: FastifyReply) => {
        return LoginUserController(request, reply)
    })
    fastify.get("/user/token/get", VerifyTokenAndFetchUser);


    fastify.get("/product/get/:sequenceIdUser", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetProductByUserController(request, reply)
    })
    fastify.get("/product/get/stock/:sequenceIdUser", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetProductWithStockController(request, reply)
    })
    fastify.post("/product/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreateProductController(request, reply)
    })
    fastify.post("/product/bulk", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreateBulkProductsController(request, reply)
    })
    fastify.put("/product/stock/:sequenceIdProduct", async (request: FastifyRequest, reply: FastifyReply) => {
        return UpdateProductStockController(request, reply)
    })
    fastify.put("/product/update/:sequenceIdProduct", async (request: FastifyRequest, reply: FastifyReply) => {
        return UpdateProductController(request, reply)
    })
    fastify.delete("/product/delete/:sequenceIdProduct", async (request: FastifyRequest, reply: FastifyReply) => {
        return DeleteProductController(request, reply)
    })


    fastify.get("/product-stock/get/:sequenceIdUser", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetProductStockController(request, reply)
    })
    fastify.get("/product-stock/pie/get/:sequenceIdUser", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetProductStockControllerPie(request, reply)
    })
}