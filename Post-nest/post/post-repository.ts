import { Model, Mongoose } from "mongoose";
import { odmPostSchema, odmpost } from "./odm-post";
import { PostInterface } from "./post-interface";
import { OdmUserRepository } from "src/user/user-repository";



export class OdmPostRepository {
    
    private readonly model: Model<odmpost> //variables para usar los ODM 
    private readonly user: OdmUserRepository

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<odmpost>('OdmPost', odmPostSchema) // en el constructor los inyectas 
        this.user = new OdmUserRepository(mongoose)
    }

    async savePost(entry: PostInterface): Promise<void> { //funcion para guardar los post. usa la interface de Post 
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
        } catch (e) {
            console.log(e)
        }
    }

    async findById(entry: string): Promise<any> {      // funcion para buscar un id especifico 
        const odm = await this.model.findOne( { idPost: entry } ) //idpost sale de ODM-post para buscar por ese ID especifico
        if (odm) {
            const result = await this.user.findById(odm.iduserAutor) //usar user para acceder a User-Repo y la funcion findbyid para buscar el idusert
            return {
                idPost: odm.idPost, 
                contenido: odm.contenido,               //te retorna un arreglo con todos las variables
                imagen: odm.imagen,
                fecha: odm.fecha,
                user: {
                    email: result.email,
                    idUser: result.idUser,
                    name: result.name,
                    imagen: result.imagen
                }
            }
        }
    }


    async findMany(): Promise<any> {                                            //findmany te busca todo lo que encuentre y usas un for para recorrer todo la lista 
        const lista: {} [] = []                                                                //lista es un arreglo de objetos.
        const odm = await this.model.find({}, {}, {skip:0, limit:100})          //esta variable utiliza model para entrar al ODM y usar la funcion find
        if(odm){
            for (let result of odm){
                const Uuser = await this.user.findById(result.iduserAutor)
                if(Uuser){
                    lista.push({
                        idPost: result.idPost, 
                        contenido: result.contenido,               //te retorna un arreglo con todos las variables
                        imagen: result.imagen,
                        fecha: result.fecha,
                        user: {
                            email: Uuser.email,
                            idUser: Uuser.idUser,
                            name: Uuser.name,
                            imagen: Uuser.imagen

                }})
                }

            }

        }
                                                                                 //el for es para recorrer toda la lista
                                                                                 //esta const Uuser usa User para el ODM y usar result para encontrar el idautor
                                                                                // si Uuser existe push lo empuja hacia la lista en un arreglo de objetos
        }        
    }


}