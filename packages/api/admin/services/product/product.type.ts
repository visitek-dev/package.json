import {Field, ID, Int, Float, ObjectType} from 'type-graphql';
import Category from '../category/category.type';
import {Entity, BaseEntity, ObjectIdColumn, Column} from "typeorm";
import {ObjectID} from "mongodb";
import Gallery from "./gallery.type";


@ObjectType()
@Entity()
export default class Product extends BaseEntity {
    @Field(type => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field(type => ID)
    @Column({unique: true})
    sku: string;

    @Field()
    @Column()
    name: string;

    @Field(type => [String])
    @Column()
    image: [String];

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    unit: string;

    @Field(type => [Category])
    @Column()
    categories: Category[];

    @Field(type => Float)
    @Column()
    price: number;

    @Field(type => Float)
    @Column()
    salePrice: number;

    @Field(type => Int)
    @Column()
    discountInPercent: number;

    @Field(type => Int, {defaultValue: 1})
    @Column()
    per_unit: number;

    @Field(type => Int)
    @Column()
    quantity: number;

    @Field(type => Int, {nullable: true})
    @Column()
    views?: number;

    @Field(type => Int, {nullable: true})
    @Column()
    sales?: number;

    @Field({nullable: true})
    @Column()
    description?: string;

    @Field()
    @Column()
    creation_date: Date;

    @Field()
    @Column()
    slug: string;

}

