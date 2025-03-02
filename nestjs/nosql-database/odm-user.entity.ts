import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

@Schema({ collection: 'user_like' })
export class OdmUser extends Document {
    
    @Prop({ type: String, unique: true, required: false })
    id: string

    @Prop({ type: [String], required: false }) 
    likedUser: string[]
        
    @Prop({ type: String, required: false }) 
    name: string
    
    @Prop({ type: Number, required: false }) 
    age: number
    
    @Prop({ type: String, required: false, enum: ["male", "female", "none"] }) 
    gender: string

}

export const OdmUserSchema = SchemaFactory.createForClass( OdmUser )