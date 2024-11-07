import { Injectable } from '@nestjs/common';
import { client as xmppClient, xml } from '@xmpp/client';
// import { xml } from '@xmpp/xml';
@Injectable()
export class XmppService {
  private xmpp: any;

  constructor() {
    this.xmpp = xmppClient({
      service: 'ws://localhost:5280/xmpp/websocket', // URL do seu servidor XMPP
      domain: 'localhost', // Altere para o domínio que você configurou
      resource: 'resource',
      username: 'admin', // Altere para o seu nome de usuário
      password: 'secret123', // Altere para a sua senha
    });

    this.xmpp.on('error', (error: any) => {
      console.error('XMPP Error:', error);
    });

    this.xmpp.on('online', async (addr: any) => {
      console.log('Connected as', addr.toString());
      // Aqui você pode enviar uma mensagem inicial ou fazer outras operações
    });

    this.xmpp.on('stanza', (stanza: any) => {
      console.log('Received stanza:', stanza.toString());
      // Aqui você pode processar mensagens recebidas
    });

    this.xmpp.start().catch(console.error);
  }

  // Método para enviar mensagens
  sendMessage(to: string, body: string) {
    console.log('TESTE');
    
  console.log(  xmppClient);

    const message = xml(
      'message',
      { to, type: 'chat' },
      xml('body', {}, body),
    );
    this.xmpp.send(message);
  }
}
