import { Controller, Inject, Logger } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IUserRepository } from "src/user/application/repository-interface/user-repository.interface";
import { OdmUserRepository } from "../repository/odm-user-repository";

@Controller()
export class UserController {

    private readonly logger = new Logger('LIKE-MS')
    private readonly userRepo: IUserRepository

    constructor( @Inject('NoSQL') mongo: Mongoose ) {
        this.userRepo = new OdmUserRepository( mongo )
    }

    async initUser( @Payload() entry: CreateUserEntryController ) { 
        this.logger.log('[RPC] USERINIT - ', entry.userId)
        const result = await this.userRepo.saveUser({
            id: entry.userId,
            name: '',
            age: 0,
            gender: 'none',
            genderPreference: 'none',
            description: '',
            image: [],
            dislikedUser: [],
            likedUser: [],
            matchedUser: []        
        })
        //const result = await this.userRepo.findById(entry.userId)
        //const query = (await this.userRepo.findMany(userValue, { page: parseInt(entry.page), perPage: parseInt(entry.perPage) } )).Value
        return entry
    }

}