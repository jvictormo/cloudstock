import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";

async function LoginUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { email, password, rememberMe } = request.params as { email: string, password: string, rememberMe: boolean };

        if (!email || !password) {
            return reply.status(401).send({ error: "Preencha todos os ampos." });
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return reply.status(401).send({ error: "Senha ou email incorretos." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid || !user) {
            return reply.status(401).send({ error: "Senha ou email incorretos." });
        }

        const expiresIn = rememberMe ? "7d" : "6h";

        const token = jwt.sign(
            { sequenceIdUser: user.sequenceIdUser, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn }
        );

        return reply.status(200).send({
            message: "Login successful",
            token,
            user: {
                id: user.sequenceIdUser,
                name: user.name,
                companyName: user.companyName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Error trying to login user" });
    }
}

export { LoginUserController }