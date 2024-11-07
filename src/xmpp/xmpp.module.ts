import { Module } from '@nestjs/common';
import { XmppService } from './xmpp.service';
import { XmppController } from './xmpp.controller';

@Module({
  providers: [XmppService],
  exports: [XmppService],
  controllers: [XmppController],
})
export class XmppModule {}
