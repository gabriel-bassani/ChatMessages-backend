import { Controller, Post, Body } from '@nestjs/common';
import { XmppService } from './xmpp.service';

@Controller('xmpp')
export class XmppController {
  constructor(private readonly xmppService: XmppService) {}

  @Post('send')
  sendMessage(@Body() body: { to: string; message: string }) {
    this.xmppService.sendMessage(body.to, body.message);
    return { status: 'Message sent' };
  }
}
