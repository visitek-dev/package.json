import {InputType, Field, ID, Int, Float} from 'type-graphql';
import Product from './product.type';
import {Entity, BaseEntity, ObjectIdColumn, Column, PrimaryGeneratedColumn} from "typeorm";
import {ObjectID} from "mongodb";


import Category from '../category/category.type';
import DateTimeFormat = Intl.DateTimeFormat;
import CategoryInput from "../category/category.input_type";
import Gallery from "./gallery.type";
import GalleryInput from "./gallery.input_type";

@InputType({description: 'New recipe data'})
export default class AddProductInput implements Partial<Product> {

    @Field(type => ID)
    sku: string;

    @Field()
    name: string;

    @Field()
    slug: string;


    @Field()
    type: string;

    @Field({defaultValue: '1'})
    unit: string;

    @Field(type => [CategoryInput], {nullable: true})
    categories: CategoryInput[];

    @Field(type => Int)
    price: number;

    @Field(type => Float, {nullable: true})
    salePrice: number;

    @Field(type => Int, {defaultValue: 0})
    discountInPercent: number;

    @Field(type => Int, {defaultValue: 1})
    per_unit: number;

    @Field(type => Int)
    quantity: number;

    @Field({nullable: true})
    description?: string;

    @Field(type => [String], {nullable: true})
    image: [String]


    @Field({nullable: true})
    creation_date: Date;
}
