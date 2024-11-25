import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import User from "../../models/User";

async function CreateUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, companyName, email, password } = request.body as { name: string, companyName: string, email: string, password: string };

        if (!name || !companyName || !email || !password) {
            return reply.status(400).send({ error: "Fill all the camps." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return reply.status(409).send({ error: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, companyName, email, password: hashedPassword });

        return reply.status(201).send({
            message: "User successfully created",
            user,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to create user" });
    }
}

export { CreateUserController }