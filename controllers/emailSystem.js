import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.email,
        pass: process.env.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Template for user email
const generateUserEmailTemplate = (data) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hello ${data.userName}!</h2>
            <p>Thank you for contacting us. We have received your message:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Message:</strong> ${data.message}</p>
            </div>
            <p>We will get back to you soon.</p>
            <p>Best regards,<br>Your Team</p>
        </div>
    `;
};

// Template for admin email
const generateAdminEmailTemplate = (data) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                <p><strong>From:</strong> ${data.userName} (${data.userEmail})</p>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Message:</strong> ${data.message}</p>
                <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            </div>
        </div>
    `;
};

// Send email controller
export const sendEmail = async (req, res) => {
    try {
        const { userName, userEmail, subject, message } = req.body;

        // Validate input
        if (!userName || !userEmail || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Email data object
        const emailData = {
            userName,
            userEmail,
            subject,
            message
        };

        // Send email to user
        await transporter.sendMail({
            from: process.env.email,
            to: userEmail,
            subject: 'Thank you for contacting us',
            html: generateUserEmailTemplate(emailData)
        });

        // Send email to admin
        await transporter.sendMail({
            from: process.env.email,
            to: process.env.email, // Admin email
            subject: 'New Contact Form Submission',
            html: generateAdminEmailTemplate(emailData)
        });

        res.status(200).json({
            success: true,
            message: 'Emails sent successfully'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending emails',
            error: error.message
        });
    }
};


