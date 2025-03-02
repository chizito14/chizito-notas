import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { IUser } from "./application/user.interface";
import { filter } from "rxjs";
import { DTOInterfaceUserCreate } from "./DTO/DtoCrear";
import { v4 } from "uuid";
import { DtoDeleteUser } from "./DTO/DtoBorrar";
import { OdmUserRepository } from "./odm-user-repository";
import { Mongoose } from "mongoose";

@Controller('user')
export class UserController {

    private readonly userRepo: OdmUserRepository

    constructor( 
        @Inject('NoSQL') mongo: Mongoose 
    ) {
        this.userRepo = new OdmUserRepository( mongo )
    }

    DBUser: IUser[] = []

    @Get('obtener/:id')
    user( @Param('id') iduser:string ){
        return this.userRepo.findById(iduser)
    }
    
    @Get('obtenerTodos')
    obtenerTodos(){
        return this.DBUser
    }
    @Post('crear')
    crearUsuario(@Body() user: DTOInterfaceUserCreate){
        /*this.DBUser.push({
            email: user.email,
            password: user.password,
            idUser: v4()
        })*/
        
        this.userRepo.saveUser({
            ...user,
            idUser: v4()
        })
        console.log("se creo el ususario:", user)
    }
    @Get('obtenerVarios')
    obtenervarios(@Query() cantidad:string ){
        console.log(cantidad)
        return this.DBUser
    }
    @Post('deleteUser')
    DelUser( @Body() IDdelete: DtoDeleteUser){
        this.DBUser= this.DBUser.filter( e => e.idUser != IDdelete.id)
        console.log(this.DBUser)
    }

 

}