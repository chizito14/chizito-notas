import { Provider } from "@nestjs/common";
import { connect } from "mongoose";

export const envs = {
    db_user: 'admin',
    db_password: '12345678',
    db_host: 'localhost',
    db_name: 'mongodb',
}


export const MongooseDataBaseProvider: Provider = 
  {
    provide: 'NoSQL',
    useFactory: async () => {
      try {
        const connection = await connect( `mongodb://${envs.db_user}:${envs.db_password}@${envs.db_host}:27017/`, {dbName: envs.db_name });
        return connection;
      } catch (error) {
        console.log(`Error al conectar a MongoDB: ${error.message}`);
        throw error;
      }
    },
  }

//DB_HOST=localhost
//DB_USER=admin
//DB_PASSWORD=password
//DB_NAME=mongodb