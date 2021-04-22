import 'reflect-metadata';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {createConnection} from "typeorm";
import ProductResolver from './admin/services/product/product.resolver';
import CategoryResolver from './admin/services/category/category.resolver';
import CustomerResolver from './admin/services/customer/customer.resolver';
// import CouponResolver from './admin/services/coupon/coupon.resolver';
import OrderResolver from './admin/services/order/order.resolver';
import UploadResolver from "./admin/services/upload/upload.resolver";
import StuffResolver from './admin/services/stuff/stuff.resolver';
import LoginResolver from "./admin/services/login/login.resolver";
import helmet from "helmet";

import {graphqlUploadExpress} from 'graphql-upload'
import bodyParser from "body-parser";
import cors from 'cors';
// @ts-ignore
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app: express.Application = express();
const path = '/graphql';
const PORT = process.env.PORT;

const startServer = async () => {
    await createConnection();// 1
    // app.use(helmet({contentSecurityPolicy: (process.env.NODE_ENV === 'production')? undefined: false}));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    const schema = await buildSchema({
        resolvers: [
            ProductResolver,
            CategoryResolver,
            CustomerResolver,
            OrderResolver,
            // CouponResolver,
            StuffResolver,
            LoginResolver,
            UploadResolver
        ],
        validate: false,
    });

    const apolloServer = new ApolloServer({
        schema,
        introspection: true,
        playground: true,
        tracing: true,
        uploads: false
    });
    app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
    app.use(express.static('assets'))
    apolloServer.applyMiddleware({app, path});

    app.listen(PORT, () => {
        console.log(`🚀 started http://localhost:${PORT}${path}`);
    });
};

startServer();
