import Fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = Fastify();

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range'],
    credentials: true,
});

app.get('/ping', async (request, reply) => {
    return { message: 'Pong' };
});

const start = async () => {
    try {
        await connectDB();

        await app.register(routes);

        const port = process.env.PORT || 32831;

        await app.listen({ port: Number(port) })
        console.log(`Server started at port: ${port}`)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start()