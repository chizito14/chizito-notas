import { Module } from '@nestjs/common';
import { MongooseDataBaseProvider } from './MongooseDataBaseProvider';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';

@Module({
  imports: [],
  controllers: [
  UserController,
  PostController
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
