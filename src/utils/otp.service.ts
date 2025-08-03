import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import { sendEmail } from 'src/utils/sendEmail';

@Injectable()
export class OtpService {
  private otps: Record<string, { code: string; expiresAt: number }> = {};

  async sendOtp(email: string) {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    const expiresAt = Date.now() + 3 * 60 * 1000;

    this.otps[email] = {
      code: otp,
      expiresAt,
    };

    await sendEmail(
      email,
      'Tasdiqlovchi kod (OTP)',
      `Sizning bir martalik parolingiz: ${otp}\n\nBu kod 3 daqiqa ichida amal qiladi.`
    );

    return { message: 'OTP yuborildi!' };
  }

  verifyOtp(email: string, enteredOtp: string) {
    const record = this.otps[email];
    if (!record) return false;

    const isExpired = Date.now() > record.expiresAt;
    const isValid = enteredOtp === record.code;

    if (isValid && !isExpired) {
      delete this.otps[email];
      return true;
    }

    return false;
  }
}
