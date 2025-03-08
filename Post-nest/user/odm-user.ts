import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

//nombre de la tabla 

@Schema({ collection: 'user' })
export class OdmUser extends Document {
    
    @Prop({ type: String, unique: true, required: true })
    idUser: string

    @Prop({ type: String, required: true }) 
    name: string
    
    @Prop({ type: String, unique: true ,required: true }) 
    email: string
    
    @Prop({ type: String, required: true }) 
    password: string

    @Prop({ type: String, required: false }) 
    imagen: string

}

export const OdmUserSchema = SchemaFactory.createForClass( OdmUser )