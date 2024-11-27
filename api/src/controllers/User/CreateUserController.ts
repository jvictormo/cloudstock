import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import User from "../../models/User";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function CreateUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, companyName, email, password, confirmPassword } = request.body as { name: string, companyName: string, email: string, password: string, confirmPassword: string };

        if (!name || !companyName || !email || !password) {
            return reply.status(400).send({ error: "Preencha todos os campos." });
        }
        
        if (password != confirmPassword) {
            return reply.status(400).send({ error: "Senhas não coincidem." });
        }

        if (!emailRegex.test(email)) {
            return reply.status(400).send({ error: "Formato de e-mail inválido." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return reply.status(400).send({ error: "Email já registrado." });
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