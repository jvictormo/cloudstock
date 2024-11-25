import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { GetUserByIdController } from "./controllers/User/GetUserByIdController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { LoginUserController } from "./controllers/User/LoginUserController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/user/:sequenceIdUser", async (request: FastifyRequest, reply: FastifyReply) => {
        return GetUserByIdController(request, reply)
    })
    fastify.post("/user/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return CreateUserController(request, reply)
    })
    fastify.get("/user/login/:email/:password", async (request: FastifyRequest, reply: FastifyReply) => {
        return LoginUserController(request, reply)
    })
}