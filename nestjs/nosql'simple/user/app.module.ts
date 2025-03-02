import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ProductsController } from './products/products.controller';
import { MongooseDataBaseProvider } from './core/mongoose-db-provider';


@Module({
  imports: [],
  controllers: [
    UserController,
    ProductsController

  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
