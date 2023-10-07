import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, host: 'localhost', port: 6379 }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
