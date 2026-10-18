import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nombre, telefono } = await req.json();

  if (!nombre || !telefono) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  await resend.emails.send({
    from: 'OBL Prime Imóveis <onboarding@resend.dev>',
    to: process.env.RESEND_TO_EMAIL!,
    subject: '🏠 Nueva solicitud de información — Bombinhas',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #C9A24B; margin-top: 0;">Nueva solicitud de información</h2>
        <p style="color: #333; font-size: 15px;">Un cliente ha solicitado información sobre proyectos en Bombinhas.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; font-weight: bold; color: #555; width: 120px;">Nombre</td>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; color: #111;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; font-weight: bold; color: #555;">Teléfono</td>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; color: #111;">${telefono}</td>
          </tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">OBL Prime Imóveis · Bombinhas, SC</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
