import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XmppModule } from './xmpp/xmpp.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [XmppModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
