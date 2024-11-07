import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Ajuste conforme necessário para seu ambiente
    },
  })
  export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
  
    @SubscribeMessage('messageToServer')
    handleMessage(client: Socket, payload: { to: string; message: string }): void {
      this.logger.log(`Message from ${client.id}: ${payload.message}`);
      // Enviar mensagem ao destinatário
      this.server.emit('messageToClient', payload);
    }
  
    afterInit(server: Server) {
      this.logger.log('WebSocket initialized');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  }
  