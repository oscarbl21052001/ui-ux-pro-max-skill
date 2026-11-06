import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Rate limiting: max 5 requests per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Demasiados intentos. Inténtalo más tarde.' }, { status: 429 });
  }

  const { nombre, telefono } = await req.json();

  if (
    !nombre || !telefono ||
    typeof nombre !== 'string' || typeof telefono !== 'string' ||
    nombre.length > 200 || telefono.length > 30
  ) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  await resend.emails.send({
    from: 'OBL Prime Imóveis <onboarding@resend.dev>',
    to: 'lucia.corretorabrasil@gmail.com',
    subject: '🏠 Nueva solicitud de información — Bombinhas',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #C9A24B; margin-top: 0;">Nueva solicitud de información</h2>
        <p style="color: #333; font-size: 15px;">Un cliente ha solicitado información sobre proyectos en Bombinhas.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; font-weight: bold; color: #555; width: 120px;">Nombre</td>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; color: #111;">${esc(nombre)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; font-weight: bold; color: #555;">Teléfono</td>
            <td style="padding: 10px 12px; background: #fff; border: 1px solid #eee; color: #111;">${esc(telefono)}</td>
          </tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">OBL Prime Imóveis · Bombinhas, SC</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
