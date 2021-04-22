import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, BaseEntity, Column, ObjectIdColumn} from "typeorm";
import {ObjectID} from "mongodb";

@ObjectType()
@Entity()
export default class Admin extends BaseEntity {
    @Field(type => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    password: string
}