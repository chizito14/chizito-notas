import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { v4 } from "uuid";
import { odmpost } from "./odm-post";
import { OdmPostRepository } from "./post-repository";
import { CreatePostEntry } from "./dto/create-post";

@Controller('Post')
export class PostController {

    private readonly postRepo: OdmPostRepository

    constructor( 
        @Inject('NoSQL') mongo: Mongoose 
    ) {
        this.postRepo = new OdmPostRepository( mongo )
        
    }

    @Get('obtener/:id')
    post( @Param('id') idpost:string ){
        return this.postRepo.findById(idpost)
    }
    
    
    @Get('obtenerMuchos')
    obtenerpost(){
        return this.postRepo.findMany()
    }
    

    @Post('crear')
    crearPost(@Body() post: CreatePostEntry ){     
        this.postRepo.savePost({
            ...post,
            fecha:new Date(),
            idPost: v4()
        })
        console.log("se creo el post:", post)
    }
}