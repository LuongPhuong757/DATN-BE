// static.controller.ts

import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('static')
export class StaticController {
    @Get(':filename')
    serveStatic(@Param('filename') filename: string, @Res() res: Response) {
        const publicPath = join('public');
        res.sendFile(filename, { root: publicPath });
    }
}