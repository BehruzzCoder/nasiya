import * as nodemailer from 'nodemailer';

export async function sendEmail(
    to: any,
    subject: any,
    text: any
) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
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
