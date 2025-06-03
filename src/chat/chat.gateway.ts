import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Trong môi trường production, bạn nên giới hạn origin
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    return { event: 'joinRoom', data: { room } };
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    return { event: 'leaveRoom', data: { room } };
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { room: string; message: string; userId: string }) {
    const { room, message, userId } = payload;
    console.log(payload);
    // Lưu message vào database
    const savedMessage = await this.chatService.saveMessage(userId, room, message);
    
    // Gửi message đến tất cả client trong room
    this.server.to(room).emit('newMessage', {
      userId,
      message,
      timestamp: new Date(),
    });

    return { event: 'sendMessage', data: savedMessage };
  }
} 