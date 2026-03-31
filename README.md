## Rate Limiting

##### Visit--- https://www.npmjs.com/package/@nestjs/throttler

##### Install---

```bash
npm i @nestjs/throttler
```

##### app.module.ts e imports koro--- ThrottlerModule ar providers e daw--- { provide: 'APP_GUARD', useClass: ThrottlerGuard }

#### app.module.ts
```bash
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
```

#### app.controller.ts
```bash
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Throttle({
    ShortTermThrottler: {
      limit: 3,
      ttl: 60000,
    }
  })
  getHello(): string {
    // return this.appService.getHello();
    return 'This route is rate limited to 3 requests per minute.';
  }
}
```

##### 3bar er beshi request ba reload dile errormessage show korbe
![](/public/Img/1strequest.png)
![](/public/Img/rate-limit.png)