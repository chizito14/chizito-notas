import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

@Schema({ collection: 'post' })
export class odmpost extends Document {
    
    @Prop({ type: String, unique: true, required: true })
    idPost: string
    
    @Prop({ type: String, required: true }) 
    contenido?: string
    
    @Prop({ type: String, required: true }) 
    imagen?: string
    
    @Prop({ type: Date, required: true }) 
    fecha:Date
    
    @Prop({ type: String, required: true }) 
    iduserAutor: string

}

export const odmPostSchema = SchemaFactory.createForClass( odmpost )