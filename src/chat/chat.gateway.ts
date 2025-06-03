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
  handleJoinRoom(client: Socket, roomId: number) {
    const room = `room_${roomId}`;
    client.join(room);
    console.log(`Client ${client.id} joined room ${room}`);
    return { event: 'joinRoom', data: { room } };
  }

  @SubscribeMessage('joinAdminRoom')
  handleJoinAdminRoom(client: Socket) {
    const room = 'admin_room';
    client.join(room);
    return { event: 'joinAdminRoom', data: { room } };
  }

  @SubscribeMessage('sendUserMessage')
  async handleUserMessage(client: Socket, payload: { roomId: number; content: string }) {
    const { roomId, content } = payload;
    console.log(roomId, content);
    // Lưu tin nhắn từ user
    const savedMessage = await this.chatService.saveMessage(roomId, roomId, content, false);
    
    // Gửi tin nhắn đến phòng của user
    this.server.to(`room_${roomId}`).emit('newMessage', savedMessage);
    
    // Gửi tin nhắn đến phòng admin
    this.server.to('admin_room').emit('newUserMessage', savedMessage);

    return { event: 'sendUserMessage', data: savedMessage };
  }

  @SubscribeMessage('sendAdminMessage')
  async handleAdminMessage(client: Socket, payload: { roomId: number; content: string }) {
    const { roomId, content } = payload;
    
    // Lưu tin nhắn từ admin
    const savedMessage = await this.chatService.saveMessage(roomId, 0, content, true);
    
    // Gửi tin nhắn đến phòng của user
    this.server.to(`room_${roomId}`).emit('newMessage', savedMessage);
    
    // Gửi tin nhắn đến phòng admin
    this.server.to('admin_room').emit('newAdminMessage', savedMessage);

    return { event: 'sendAdminMessage', data: savedMessage };
  }
} 