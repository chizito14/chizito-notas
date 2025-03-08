import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { OdmUserRepository } from "./user-repository";
import { Mongoose } from "mongoose";
import { v4 } from "uuid";
import { DTOInterfaceUserCreate } from "./DTO/dto-crear";

@Controller('user')
export class UserController {

    private readonly userRepo: OdmUserRepository

    constructor( 
        @Inject('NoSQL') mongo: Mongoose 
    ) {
        this.userRepo = new OdmUserRepository( mongo )
    }

    @Get('obtener/:id')
    user( @Param('id') iduser:string ){
        return this.userRepo.findById(iduser)
    }
    
    @Post('crear')
    crearUsuario(@Body() user: DTOInterfaceUserCreate){     
        this.userRepo.saveUser({
            ...user,
            idUser: v4()
        })
        console.log("se creo el ususario:", user)
    }
}