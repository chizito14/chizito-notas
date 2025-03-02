import { Model, Mongoose } from "mongoose";
import { OdmUser, OdmUserSchema } from "./odm-user";
import { IUser } from "./application/user.interface";

export class OdmUserRepository {
    filter(arg0: (e: any) => boolean) {
        throw new Error("Method not implemented.");
    }
    
    private readonly model: Model<OdmUser>

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmUser>('OdmUser', OdmUserSchema)
    }

    async saveUser(entry: IUser): Promise<void> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
        } catch (e) {
            console.log(e)
        }
    }

    async findById(entry: string): Promise<any> {
        const odm = await this.model.findOne( { idUser: entry } )
        return odm
    }

    async updateUser(entry: IUser): Promise<void> {
        const resultFind = await this.model.findOne( { idUser: entry.idUser } )
        try {
            if(resultFind) await resultFind.updateOne( entry )
        } catch (e) {
            console.log(e)
        }
    }



}