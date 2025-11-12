import { Injectable } from '@nestjs/common';
import { client as xmppClient, xml } from '@xmpp/client';
@Injectable()
export class XmppService {
  private xmpp: any;

  constructor() {
    this.xmpp = xmppClient({
      service: 'ws://localhost:5280/xmpp/websocket',
      domain: 'localhost',
      resource: 'resource',
      username: 'admin',
      password: 'secret123'
    });

    this.xmpp.on('error', (error: any) => {
      console.error('XMPP Error:', error);
    });

    this.xmpp.on('online', async (addr: any) => {
      console.log('Connected as', addr.toString());
    });

    this.xmpp.on('stanza', (stanza: any) => {
      console.log('Received stanza:', stanza.toString());
    });

    this.xmpp.start().catch(console.error);
  }

  sendMessage(to: string, body: string) {
    
  console.log(  xmppClient);

    const message = xml(
      'message',
      { to, type: 'chat' },
      xml('body', {}, body),
    );
    this.xmpp.send(message);
  }
}
