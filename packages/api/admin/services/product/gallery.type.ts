import {ObjectType, Field} from 'type-graphql';

@ObjectType()
export default class Gallery {
    @Field()
    name: string;
}
