import { Pagination, Result } from "_libs/core";
import { Model, Mongoose } from "mongoose";
import { OdmUser, OdmUserSchema } from "../entity/odm-user";
import { IUserRepository } from "src/user/application/repository-interface/user-repository.interface";
import { UserModel } from "src/user/application/entity-model/user-model";

export class OdmUserRepository implements IUserRepository {
    
    private readonly model: Model<OdmUser>

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmUser>('Odmuser', OdmUserSchema)
    }

    async findMany(user: UserModel, pag: Pagination): Promise<Result<UserModel[]>> {
        const result = await this.model.find({
            // $ne (not-equal): El campo no es igual al valor especificado
            // $nin (not in): El campo no es igual a ninguno de los valores especificados en un array
            // $in (): El campo es igual a alguno de los valores especificados en un array
            id: {
                $ne: user.id,
                $nin: [...user.likedUser, ...user.dislikedUser, ...user.matchedUser],
            },
            gender: user.genderPreference,
            genderPreference: user.gender
        }, {},  { skip: pag.page, limit: pag.perPage }
        )
        return .success()
    }

    async updateUser(entry: UserModel): Promise<Result<string>> {
        const resultFind = await this.model.findOne( { id: entry.id } )
        try {
            const resultUpdate = await resultFind.updateOne( entry )
            return Result.success( entry.id ) 
        } catch (e) {
            return Result.fail( new Error('asdas') )
        }
    }

    async saveUser(entry: UserModel): Promise<Result<UserModel>> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
            return Result.success( entry )
        } catch (e) {
            console.log(e)
            return Result.fail( new Error('') )
        }
    }
    
    async findById(entry: string): Promise<Result<UserModel>> {
        const odm = await this.model.findOne( { id: entry } )
        if ( !odm ) return Result.fail(new Error('Account not found'))
        return Result.success( odm )
    }

}