import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { OdmUserRepository } from "./user-repository";
import { v4 } from "uuid";
import { DtoIUserRegister } from "./dto/dto-register";
import { Iuser } from "./I-user";
import { DtoLogin } from "./dto/dto-login";
import { error } from "console";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "./auth-guards";
import * as bcrypt from 'bcrypt'
import { GetUser } from "./get-user-data";

@Controller("user")
export class UserController {

    private readonly userRepo: OdmUserRepository
    private readonly logger = new Logger("UserController");
    constructor(
        private jwt: JwtService, 
        @Inject('NoSQL') mongo: Mongoose 
    ){
        this.userRepo = new OdmUserRepository (mongo )
    
    }

    @Post ('login')
    async login(@Body() entryDto: DtoLogin ){
        const odm = await this.userRepo.findbyemail(entryDto.email)
        if (!odm) throw new Error('no existe el correo')
        const password = await bcrypt.compare(entryDto.password, odm.password)
        if ( !password ) throw new Error ('contraseña incorrecta')
        this.logger.log('loggeo exitoso ' + entryDto.email  )
        return { token: this.jwt.sign( { id: odm.idUser } ) }
        

    }

    @Post ('register')
    async register(@Body() registerDTO: DtoIUserRegister ){
        const odm = await this.userRepo.findbyemail(registerDTO.email)
        if (odm) throw new Error('email ya registrado')
        const odmUser = await this.userRepo.findbyNamerUser(registerDTO.name)
        if (odmUser) throw new Error (' nombre de usuario registrado ')
        await this.userRepo.saveUser({
            ... registerDTO,
            idUser:v4(),  
            password : await bcrypt.hash(registerDTO.password, 10)  
        })
        this.logger.log('usuario registrado ' + registerDTO.email  )

    }

    @Get ('token')
    @UseGuards(JwtAuthGuard) 
    async verifitoken(){}

    @Get ('products')
    @UseGuards(JwtAuthGuard)
    async products (@GetUser() data: Iuser){

        this.logger.log('busqueda exitoso ' + data.idUser  )
        return [
            {name: 'cicacika', price: 44},
            {name: 'cicacika', price: 44},
            {name: 'cicacika', price: 44},
            {name: 'cicacika', price: 44},
        ]
    }
}
