import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, project_type, message } = await request.json();

    // Isesend lang natin ito sa sarili mong email (Pasok sa Free Tier sandbox!)
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'jorusjunio28@gmail.com',
      subject: `New Portfolio Inquiry from ${name}`,
      html: `
        <div style="margin:0; padding:0; background:#ffffff; font-family:Arial, sans-serif; color:#111111;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; background:#ffffff; margin: auto;">
            <tr>
              <td style="background:#050505; padding:34px 40px; border-bottom:4px solid #00ff87;">
                <p style="margin:0 0 12px; color:#00ff87; font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase;">Portfolio Contact</p>
                <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:800;">New message from ${name}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project Type:</strong> <span style="background:#ecfff5; color:#008f4d; padding:4px 8px; font-weight:bold;">${project_type}</span></p>
                <p><strong>Message:</strong></p>
                <div style="background:#fafafa; border:1px solid #e8e8e8; padding:20px;">${message}</div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}