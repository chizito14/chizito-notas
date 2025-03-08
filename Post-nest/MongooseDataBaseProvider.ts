import { Provider } from "@nestjs/common";
import { connect } from "mongoose";

export const MongooseDataBaseProvider: Provider = 
  {
    provide: 'NoSQL',
    useFactory: async () => {
      try {
        const connection = await connect( `mongodb://admin:12345678@localhost:27017/`, {dbName:  'mongodb'},);
        return connection;
      } catch (error) {
        console.log(`Error al conectar a MongoDB: ${error.message}`);
        throw error;
      }
    },
  }