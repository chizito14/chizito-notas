import { Model, Mongoose } from "mongoose";
import { OdmUser, OdmUserSchema } from "./Odm-user";
import { Iuser } from "./I-user";

export class OdmUserRepository {
    
    private readonly model: Model<OdmUser>

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmUser>('OdmUser', OdmUserSchema)
    }

    async saveUser(entry: Iuser): Promise<void> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
        } catch (e) {
            console.log(e)
        }
    }

    async findById(entry: string): Promise<Iuser | null> {
        const odm = await this.model.findOne( { idUser: entry } )
        return odm

    }

    async findbyemail(entry: string): Promise<Iuser | null>{
        const odm = await this.model.findOne( { email:entry})
        return odm   
    }
    async findbyNamerUser(entry: string): Promise<Iuser | null>{
        const odm = await this.model.findOne( { name:entry})
        return odm   
    }


}