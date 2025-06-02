// static.controller.ts

import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('static')
export class StaticController {
    @Get(':filename')
    serveStatic(@Param('filename') filename: string, @Res() res: Response) {
        // Xác định đường dẫn tới thư mục public
        const publicPath = join('public');
        console.log(publicPath)
        console.log(filename)
        // const publicPath1 = join(__dirname, '..', 'public');
        // console.log(publicPath1)
        // Trả về tệp tĩnh sử dụng Express.js response.sendFile()
        res.sendFile(filename, { root: publicPath });
    }
}