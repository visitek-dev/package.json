import {Resolver, Arg, Args, Mutation} from 'type-graphql';
import Admin from './login.type';
import bcrypt from 'bcrypt';
// import jsonwebtoken from 'jsonwebtoken'

@Resolver()
export default class LoginResolver {
    @Mutation(() => Boolean)
    async admin(
        @Arg("username", type => String) username: string,
        @Arg("password", type => String) password: string
    ): Promise<boolean> {

        const admin = await Admin.findOne({where: {username}})
            .then(res => console.log(res))
        return true
    }

}