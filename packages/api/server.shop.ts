import 'reflect-metadata';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {createConnection} from "typeorm";
import {UserResolver} from './shop/services/user/user.resolver';
import ProductResolver from './admin/services/product/product.resolver';
import {PaymentResolver} from './shop/services/payment/payment.resolver';
import {OrderResolver} from './shop/services/order/order.resolver';
import {CouponResolver} from './shop/services/coupon/coupon.resolver';
import cors from "cors";
// @ts-ignore
import morgan from 'morgan';
import CategoryResolver from './admin/services/category/category.resolver';

const app: express.Application = express();
const path = '/shop/graphql';
const PORT = process.env.PORT || 4000;
const main = async () => {
    await createConnection();
    app.use(morgan('combined'));

    app.use(cors());
    const schema = await buildSchema({
        resolvers: [
            // UserResolver,
            ProductResolver,
            // PaymentResolver,
            // OrderResolver,
            // CouponResolver,
            CategoryResolver,
        ],

    });
    const apolloServer = new ApolloServer({
        schema,
        introspection: true,
        playground: true,
        tracing: true,
    });
    apolloServer.applyMiddleware({app, path, cors: false});

    app.listen(PORT, () => {
        console.log(`🚀 started http://localhost:${PORT}${path}`);
    });
};

main();
