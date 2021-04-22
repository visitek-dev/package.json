import {Resolver, Query, Arg, Args, Mutation} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { createWriteStream } from "fs";


@Resolver()
export default class UploadResolver {
    @Mutation(()=> Boolean)
    async UploadImage(@Arg("file", () => GraphQLUpload) file: FileUpload):Promise<boolean>
    {
        const {createReadStream, filename} = await file;
        return new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(__dirname + `/../../../assets/image/${filename}`, {autoClose: true}))
                .on("finish", () => resolve(true))
                .on("error", () => reject(false))
        );
    }
}