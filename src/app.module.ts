import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{
        name: 'ShortTermThrottler',
        ttl: seconds(60),
        limit: 3,
      }],
      errorMessage: 'Too many requests, please try again later.',
    })
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: ThrottlerGuard }],
})
export class AppModule {}