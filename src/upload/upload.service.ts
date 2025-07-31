import { Injectable, BadRequestException } from '@nestjs/common';
import { File } from 'multer';

@Injectable()
export class UploadService {
  handleFile(file: File) {
    if (!file) {
      throw new BadRequestException('Fayl yuklanmagan! Iltimos, faylni tanlang.');
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const fileUrl = `${baseUrl}/uploads/${file.filename}`;

    return {
      message: 'Fayl muvaffaqiyatli yuklandi ✅',
      fileName: file.filename,
      originalName: file.originalname,
      size: `${file.size} bytes`,
      url: fileUrl,
    };
  }
}
