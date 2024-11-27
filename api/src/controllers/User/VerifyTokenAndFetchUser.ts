import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

export async function VerifyTokenAndFetchUser(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return reply.status(401).send({ error: 'Token não encontrado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { sequenceIdUser: number };

        const user = await User.findOne({ sequenceIdUser: decoded.sequenceIdUser });

        if (!user) {
            reply.status(404).send({ error: 'Usuário não encontrado.' });
            return;
        }

        reply.status(200).send(user);
    } catch (error) {
        return reply.status(401).send({ error: 'Token inválido ou expirado' });
    }
}
