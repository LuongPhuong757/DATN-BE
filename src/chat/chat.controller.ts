import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history/:userId')
  @ApiOperation({ summary: 'Get chat history for a specific user' })
  async getChatHistory(
    @Param('userId') userId: number,
    @Request() req,
  ) {
    // Kiểm tra nếu user đang request là admin hoặc là chính user đó
    // if (req.user.role === 'admin' || req.user.id === userId) {
      return this.chatService.getUserMessages(userId);
    // }
    throw new Error('Unauthorized');
  }

  @Get('admin/history')
  @ApiOperation({ summary: 'Get all chat history for admin' })
  async getAdminChatHistory(@Request() req) {
    // Kiểm tra nếu user đang request là admin
    if (req.user.role === 'admin') {
      return this.chatService.getAdminMessages();
    }
    throw new Error('Unauthorized');
  }
} 