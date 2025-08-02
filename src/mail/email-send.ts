import { Controller, Post, Body } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Controller('email')
export class EmailController {
    @Post('send')
    async sendEmail(
        @Body('to') to: string,
        @Body('subject') subject: string,
        @Body('text') text: string,
    ) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mirbosidovbehruz1@gmail.com',
                pass: 'gtja zaom uxxf ipsr',
            },
        });

        const mailOptions = {
            from: 'nasiya@gmail.com',
            to,
            subject,
            text,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return { message: 'Email yuborildi!', info };
        } catch (error) {
            return { message: 'Xatolik yuz berdi', error };
        }
    }
}
