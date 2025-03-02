import { Module } from '@nestjs/common';
import { MongooseDataBaseProvider } from '_libs/core';

@Module({
  imports: [],
  controllers: [],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
