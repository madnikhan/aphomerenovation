import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only if API key is available
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured. Please add it to your .env.local file.");
  }
  return new Resend(apiKey);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, quoteNumber, customerName, pdfBase64, quoteDate, total, validUntil } = body;

    if (!to || !quoteNumber || !customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert base64 to buffer for attachment
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: "AK Home Renovation <info@akhomerenovation.co.uk>", // Business email - ensure domain is verified in Resend
      to: [to],
      subject: `Quote ${quoteNumber} - AK Home Renovation`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quote ${quoteNumber}</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #202845; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">AK Home Renovation</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Professional House Refurbishment Services</p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #202845; margin-top: 0;">Quote ${quoteNumber}</h2>
              
              <p>Dear ${customerName},</p>
              
              <p>Thank you for your interest in our services. Please find attached your detailed quote.</p>
              
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #202845;">
                <p style="margin: 0 0 10px 0;"><strong>Quote Number:</strong> ${quoteNumber}</p>
                <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${new Date(quoteDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                <p style="margin: 0 0 10px 0;"><strong>Valid Until:</strong> ${new Date(validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                <p style="margin: 0; font-size: 20px; color: #202845;"><strong>Total: £${total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
              </div>
              
              <p>This quote is valid for 30 days from the date of issue. If you have any questions or would like to discuss the quote, please don't hesitate to contact us.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 5px 0;"><strong>Contact Information:</strong></p>
                <p style="margin: 5px 0;">📞 Phone: <a href="tel:+447466113917" style="color: #202845;">+44 7466 113917</a></p>
                <p style="margin: 5px 0;">📧 Email: <a href="mailto:info@akhomerenovation.co.uk" style="color: #202845;">info@akhomerenovation.co.uk</a></p>
                <p style="margin: 5px 0;">📍 Address: 55 Colmore Row, Birmingham B3 2AA</p>
              </div>
              
              <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">
                Best regards,<br>
                <strong>AK Home Renovation Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
              <p style="margin: 0; font-size: 12px; color: #6b7280;">
                © ${new Date().getFullYear()} AK Home Renovation. All rights reserved.
              </p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `Quote_${quoteNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}

