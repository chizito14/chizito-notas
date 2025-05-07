import { Module } from '@nestjs/common';
import { MongooseDataBaseProvider } from './moongose-db-provider';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'holamundo',
      signOptions: { expiresIn: '48h' }
    }),
  ],
  controllers: [UserController],
  providers: [MongooseDataBaseProvider],
})
export class AppModule {
  
}
