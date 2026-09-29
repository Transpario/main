import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    // Basic server-side validation
    if (!name || !email || !category || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, category, message) are required.' },
        { status: 400 }
      );
    }

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (discordWebhookUrl) {
      const payload = {
        username: 'Transpario Contact Bot',
        avatar_url: 'https://transpario.page/favicon.ico',
        embeds: [
          {
            title: '📩 New Contact Inquiry — Transpario',
            color: 0x2563eb, // Accent blue
            fields: [
              { name: 'Name', value: String(name), inline: true },
              { name: 'Email', value: String(email), inline: true },
              { name: 'Category', value: String(category), inline: true },
              { name: 'Message', value: String(message) },
            ],
            footer: {
              text: 'Transpario Transparency Platform',
            },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while submitting your message.' },
      { status: 500 }
    );
  }
}
