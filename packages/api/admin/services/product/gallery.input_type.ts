import {InputType, Field, ID} from 'type-graphql';
import Gallery from "./gallery.type";

@InputType({description: 'New Gallery Data'})
export default class GalleryInput implements Partial<Gallery>{
    @Field()
    name: string;
}