import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

//nombre de la tabla 

@Schema({ collection: 'user' })
export class OdmUser extends Document {
    
    @Prop({ type: String, unique: true, required: true })
    idUser: string

    @Prop({ type: String, required: false }) 
    name: string
    
    @Prop({ type: String, required: false }) 
    email: string
    
    @Prop({ type: String, required: false }) 
    password: string

    @Prop({ type: Number, required: false }) 
    age: number
    
    @Prop({ type:String, required:true})
    colorSkin: string
}

export const OdmUserSchema = SchemaFactory.createForClass( OdmUser )