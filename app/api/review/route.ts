import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';

const reviewFormSchema = z.object({
  company: z.string().min(1, "Company name is required").max(100, "Too long"),
  role: z.string().min(1, "Role is required").max(100, "Too long"),
  platform: z.string().min(1, "Please select where you found it"),
  listingUrl: z.string().max(500, "URL too long").optional(),
  
  paymentType: z.string().min(1, "Please select payment structure"),
  stipendAmount: z.string().max(100, "Too long").optional(),
  hasFee: z.string().min(1, "Please indicate if there was a fee"),
  feeAmount: z.string().max(100, "Too long").optional(),
  certificateProvided: z.string().min(1, "Please indicate if a certificate was provided"),
  
  duration: z.string().max(50, "Too long").optional(),
  mode: z.string().optional(),
  location: z.string().max(100, "Too long").optional(),
  period: z.string().max(100, "Too long").optional(),
  
  selectionProcess: z.string().optional(),
  workDescription: z.string().max(2000, "Too long").optional(),
  unexpected: z.string().max(2000, "Too long").optional(),
  keyTakeaway: z.string().max(500, "Too long").optional(),
  
  proofLink: z.string().max(500, "URL too long").optional(),
  contactEmail: z.string().max(200, "Too long").optional().or(z.literal('')),
  confirmation: z.boolean().refine(val => val === true, "You must confirm this is truthful"),
  honeypot: z.string().max(0, "Invalid").optional(),
});

// Simple in-memory rate limiter (Warning: Resets when serverless container restarts)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

// CSV Escaping helper (RFC 4180 + injection protection)
function escapeCsv(val: any): string {
  if (val === undefined || val === null) return '';
  let str = String(val);
  
  // Prevent CSV injection
  if (str.startsWith('=') || str.startsWith('+') || str.startsWith('-') || str.startsWith('@')) {
    str = "'" + str;
  }
  
  if (str.includes('"')) {
    str = str.replace(/"/g, '""');
  }
  
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    str = `"${str}"`;
  }
  
  return str;
}

export async function POST(request: Request) {
  try {
    // 1. Environment Verification
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('SERVER ERROR: DISCORD_WEBHOOK_URL is not configured.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // 2. Request Size Limits (Max 50KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 50000) {
      return NextResponse.json(
        { success: false, message: 'Request payload too large.' },
        { status: 413 }
      );
    }

    // 3. IP Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const requestTimestamps = rateLimitMap.get(ip) || [];
    
    // Filter out old timestamps
    const recentRequests = requestTimestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);
    
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // 4. Parse & Validate
    const rawData = await request.json();
    const validationResult = reviewFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 5. Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      // Silently succeed for bots
      return NextResponse.json({ success: true, message: 'Experience submitted successfully.' });
    }

    // Generate unique report ID
    const reportId = crypto.randomUUID().substring(0, 8);
    const submittedAt = new Date().toISOString();

    // 6. Build CSV
    const columns = [
      'report_id', 'submitted_at', 'company', 'role', 'platform', 'listingUrl', 
      'paymentType', 'stipendAmount', 'hasFee', 'feeAmount', 'certificateProvided', 
      'duration', 'mode', 'location', 'period', 'selectionProcess', 
      'workDescription', 'unexpected', 'keyTakeaway', 'proofLink', 'contactEmail'
    ];

    const values = [
      reportId, submittedAt, data.company, data.role, data.platform, data.listingUrl,
      data.paymentType, data.stipendAmount, data.hasFee, data.feeAmount, data.certificateProvided,
      data.duration, data.mode, data.location, data.period, data.selectionProcess,
      data.workDescription, data.unexpected, data.keyTakeaway, data.proofLink, data.contactEmail
    ];

    // UTF-8 BOM + Headers + Data
    const csvContent = '\uFEFF' + 
      columns.join(',') + '\n' +
      values.map(escapeCsv).join(',');

    // 7. Construct Discord Payload
    const formData = new FormData();
    
    const payloadJson = {
      content: `New Internship Report Submitted (#${reportId})`,
      embeds: [{
        title: `${data.company.substring(0, 100)} - ${data.role.substring(0, 100)}`,
        description: data.keyTakeaway ? `*${data.keyTakeaway.substring(0, 200)}*` : 'No takeaway provided.',
        fields: [
          { name: "Payment", value: data.paymentType, inline: true },
          { name: "Fee", value: data.hasFee === 'yes' ? 'Yes' : 'No', inline: true },
          { name: "Platform", value: data.platform, inline: true }
        ],
        color: 0x2563EB,
        footer: { text: `Report ID: ${reportId}` }
      }]
    };
    
    formData.append('payload_json', JSON.stringify(payloadJson));
    
    // Convert CSV string to Blob for FormData
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const safeCompanyName = data.company.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().substring(0, 30);
    const fileName = `report-${reportId}-${safeCompanyName}.csv`;
    
    formData.append('files[0]', csvBlob, fileName);

    // 8. Send to Discord
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
    });

    if (!discordRes.ok) {
      console.error(`Discord webhook failed with status: ${discordRes.status}`);
      return NextResponse.json(
        { success: false, message: 'Failed to submit experience. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Experience submitted successfully. It will be reviewed before publication.' 
    });

  } catch (error) {
    console.error('Error in review submission route:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
