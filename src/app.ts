import express from 'express';
import ordersRouter from './routers/orders.routes';
import productsRouter from './routers/products.routes';

const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(ordersRouter);

export default app;
