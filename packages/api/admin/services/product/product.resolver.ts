import {Resolver, Query, Arg, Args, Mutation} from 'type-graphql';
import Product from './product.type';
import Products from './products.type';
import GetProductsArgs from './product.args_type';
import AddProductInput from './product.input_type';
import search from '../../helpers/search';
import shuffle from '../../helpers/shuffle';
import {sortByHighestNumber, sortByLowestNumber} from '../../helpers/sorts';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { createWriteStream } from "fs";

@Resolver()
export default class ProductResolver {
    @Query(returns => Products, {description: 'Get all the products'})
    async products(
        @Args()
            {limit, offset, sortByPrice, type, searchText, category, children}: GetProductsArgs
    ): Promise<Products> {
        let products = await Product.find();
        if (category) {
            const cateFilter = products.filter(product =>
                product.categories.find(category_item => category_item.slug === category));
            if (!cateFilter.length) {
            products = products.filter(product =>
                product.categories.find(category_item =>
                    category_item.children?.find(child => child.slug === category))
            )
             }
            else products = cateFilter
        }
        if (type) {
            products = products.filter(product => product.type === type);
        }
        if (sortByPrice) {
            if (sortByPrice === 'highestToLowest') {
                products = sortByHighestNumber(products, 'price');
            }
            if (sortByPrice === 'lowestToHighest') {
                products = sortByLowestNumber(products, 'price');
            }
        } else {
            products = shuffle(products);
        }

        // return await products.slice(0, limit);
        products = await search(products, ['name'], searchText);
        const hasMore = products.length > offset + limit;

        return {
            items: products.slice(offset, offset + limit),
            totalCount: products.length,
            hasMore,
        };
    }

    @Query(() => [Product])
    async product(): Promise<Product[]> {
        return await Product.find()
    }

    @Mutation(() => Product!, {description: 'Create Category'})
    async createProduct(
        @Arg('product') product: AddProductInput,
        @Arg("file", () => GraphQLUpload) file: [FileUpload]
    ): Promise<Product> {
        file.map(async (res) =>{
            const {createReadStream, filename} = await res;
            new Promise(async (resolve, reject) =>
                createReadStream()
                    .pipe(createWriteStream(__dirname + `/../../../assets/image/${filename}`, {autoClose: true}))
                    .on("finish", () => resolve(true))
                    .on("error", () => reject(false))
            );
        })

        const create = Product.create(product);
        await create.save();
        console.log(create);
        return create;
    }
}
