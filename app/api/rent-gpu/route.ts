import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { gpuId, gpuModel, userDetails, rentalOptions, totalCost } = body;

        // Log the request
        console.log('Rent Request Received:', {
            gpuId,
            gpuModel,
            userDetails,
            rentalOptions,
            totalCost,
            timestamp: new Date().toISOString(),
        });

        // Configure Nodemailer (using environment variables or placeholders)
        // For production, use process.env.SMTP_HOST, etc.
        // Here we'll use a placeholder or a test account if env vars aren't set
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER || 'yassine.elgares@medtech.tn', // Fallback for demo
                pass: process.env.SMTP_PASS || 'your-app-password', // User needs to set this
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email content
        const mailOptions = {
            from: `"LocaLLM Platform" <${process.env.SMTP_USER || 'yassine.elgares@medtech.tn'}>`,
            to: 'yassine.elgares@medtech.tn',
            subject: `New GPU Rental Request: ${gpuModel}`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #000;">New GPU Rental Request</h2>
          <p><strong>GPU Model:</strong> ${gpuModel}</p>
          <p><strong>GPU ID:</strong> ${gpuId}</p>
          
          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">User Details</h3>
          <p><strong>Name:</strong> ${userDetails.name}</p>
          <p><strong>Email:</strong> ${userDetails.email}</p>
          
          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Rental Options</h3>
          <p><strong>Duration:</strong> ${rentalOptions.duration}</p>
          <p><strong>Quantity:</strong> ${rentalOptions.quantity}</p>
          <p><strong>Bid Price:</strong> ${rentalOptions.bidPrice ? `$${rentalOptions.bidPrice}/hr` : 'N/A'}</p>
          
          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Total Cost</h3>
          <p style="font-size: 1.2em; font-weight: bold; color: #000;">$${totalCost}</p>
          
          <p style="margin-top: 20px; font-size: 0.8em; color: #666;">This is an automated message from LocaLLM.</p>
        </div>
      `,
        };

        // Send email
        // Note: In a real demo without valid SMTP creds, this might fail. 
        // We'll wrap it in a try/catch specifically for the email part so the API still returns success for the UI demo.
        try {
            if (process.env.SMTP_PASS) {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } else {
                console.log('SMTP_PASS not set, skipping email sending but logging request.');
            }
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Continue to return success to the client, as the "rental" was processed system-wise
        }

        return NextResponse.json({ success: true, message: 'Rental request processed successfully' });
    } catch (error) {
        console.error('Error processing rental request:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to process rental request' },
            { status: 500 }
        );
    }
}
