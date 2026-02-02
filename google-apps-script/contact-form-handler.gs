/**
 * GradPrix Contact Form Handler
 * Google Apps Script - Email Automation
 * 
 * This script receives form submissions and sends notification emails
 * from support@gradprix.com to the team.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Sign in with your support@gradprix.com Google Workspace account
 * 3. Create a new project and paste this code
 * 4. Save and deploy as a Web App (see detailed instructions in README)
 */

// Configuration - Recipients
const RECIPIENTS = [
  'praveg@gradprix.com',
  'rajat@gradprix.com',
  'rangolie@gradprix.com'
];

const SENDER_NAME = 'GradPrix Website';

// Google Sheet Configuration
const SPREADSHEET_ID = '1MbRgQe7Veo-UilPxyDs6VTvbAZiFUwBKLsV2cf0KIZU';
const SHEET_NAME = 'Sheet1';

/**
 * Handles POST requests from the contact form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Log to Google Sheet
    logToSheet(data);
    
    // Send notification email to team
    sendTeamNotification(data);
    
    // Send confirmation email to the user
    sendUserConfirmation(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data logged and emails sent successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing form submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'GradPrix Contact Form API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Logs form submission data to Google Sheet
 */
function logToSheet(data) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Check if headers exist, if not add them
  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    const headers = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Target Schools',
      'Application Round',
      'Service of Interest',
      'Message',
      'Newsletter'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#1a2744');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  
  // Prepare the row data
  const rowData = [
    formatDate(data.submittedAt),
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.phone ? "'" + data.phone : '', // Prefix with apostrophe to force text format
    data.targetSchools || '',
    formatApplicationRound(data.applicationRound),
    formatService(data.service),
    data.message || '',
    data.newsletter || ''
  ];
  
  // Append the row
  sheet.appendRow(rowData);
  
  // Format phone column as plain text to prevent formula interpretation
  const newRow = sheet.getLastRow();
  sheet.getRange(newRow, 5).setNumberFormat('@');
  
  // Auto-resize columns for better readability (only first time or periodically)
  if (newRow <= 2) {
    for (let i = 1; i <= rowData.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}

/**
 * Sets up the sheet headers - Run this once manually if needed
 */
function setupSheetHeaders() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  const headers = [
    'Timestamp',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Target Schools',
    'Application Round',
    'Service of Interest',
    'Message',
    'Newsletter'
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#1a2744');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
  
  console.log('Sheet headers set up successfully!');
}

/**
 * Sends notification email to the GradPrix team
 */
function sendTeamNotification(data) {
  const subject = `New Consultation Request: ${data.firstName} ${data.lastName}`;
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a2744; color: #fff; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .header .subtitle { color: #c9a961; margin-top: 8px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: bold; color: #1a2744; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .field-value { background: #fff; padding: 12px 16px; border-radius: 6px; border-left: 3px solid #c9a961; }
        .message-box { background: #fff; padding: 20px; border-radius: 6px; border-left: 3px solid #1a2744; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .cta { display: inline-block; background: #c9a961; color: #1a2744; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
        .timestamp { background: #e9ecef; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Consultation Request</h1>
          <div class="subtitle">GradPrix MBA Admissions</div>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Contact Information</div>
            <div class="field-value">
              <strong>${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</strong><br>
              Email: <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a><br>
              Phone: ${escapeHtml(data.phone)}
            </div>
          </div>
          
          <div class="field">
            <div class="field-label">Target MBA Programs</div>
            <div class="field-value">${escapeHtml(data.targetSchools)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Application Round</div>
            <div class="field-value">${formatApplicationRound(data.applicationRound)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Service of Interest</div>
            <div class="field-value">${formatService(data.service)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Newsletter Subscription</div>
            <div class="field-value">${data.newsletter}</div>
          </div>
          
          <div class="message-box">
            <div class="field-label">Message</div>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
          
          <div style="text-align: center;">
            <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your GradPrix Consultation Request" class="cta">Reply to ${escapeHtml(data.firstName)}</a>
          </div>
          
          <div class="footer">
            <div class="timestamp">Submitted: ${formatDate(data.submittedAt)}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const plainBody = `
New Consultation Request - GradPrix

CONTACT INFORMATION
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

DETAILS
Target MBA Programs: ${data.targetSchools}
Application Round: ${formatApplicationRound(data.applicationRound)}
Service of Interest: ${formatService(data.service)}
Newsletter: ${data.newsletter}

MESSAGE
${data.message}

Submitted: ${formatDate(data.submittedAt)}
  `;
  
  // Send email to all recipients
  GmailApp.sendEmail(
    RECIPIENTS.join(','),
    subject,
    plainBody,
    {
      name: SENDER_NAME,
      htmlBody: htmlBody,
      replyTo: data.email
    }
  );
}

/**
 * Sends confirmation email to the user who submitted the form
 */
function sendUserConfirmation(data) {
  const subject = "Thank you for contacting GradPrix - We'll be in touch soon!";
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a2744; color: #fff; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .header .subtitle { color: #c9a961; margin-top: 8px; font-size: 16px; }
        .content { background: #ffffff; padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1a2744; margin-bottom: 20px; }
        .summary { background: #f8f9fa; padding: 24px; border-radius: 8px; margin: 24px 0; }
        .summary h3 { margin-top: 0; color: #1a2744; }
        .summary-item { margin: 12px 0; }
        .summary-label { color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .summary-value { color: #1a2744; font-weight: 500; }
        .next-steps { background: linear-gradient(135deg, #1a2744 0%, #2d3f5f 100%); color: #fff; padding: 30px; border-radius: 8px; margin: 24px 0; }
        .next-steps h3 { color: #c9a961; margin-top: 0; }
        .next-steps ul { padding-left: 20px; }
        .next-steps li { margin: 12px 0; }
        .footer { text-align: center; padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px; }
        .social-links { margin-top: 20px; }
        .social-links a { display: inline-block; margin: 0 8px; color: #1a2744; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You, ${escapeHtml(data.firstName)}!</h1>
          <div class="subtitle">Your MBA Journey Starts Here</div>
        </div>
        
        <div class="content">
          <p class="greeting">We're excited to connect with you!</p>
          
          <p>Thank you for reaching out to GradPrix. We've received your consultation request and one of our MBA admissions experts will be in touch within <strong>24 hours</strong>.</p>
          
          <div class="summary">
            <h3>Your Request Summary</h3>
            <div class="summary-item">
              <div class="summary-label">Target Schools</div>
              <div class="summary-value">${escapeHtml(data.targetSchools)}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Application Round</div>
              <div class="summary-value">${formatApplicationRound(data.applicationRound)}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Service Interest</div>
              <div class="summary-value">${formatService(data.service)}</div>
            </div>
          </div>
          
          <div class="next-steps">
            <h3>What Happens Next?</h3>
            <ul>
              <li>A team member will reach out to schedule your <strong>free consultation</strong></li>
              <li>We'll discuss your background, goals, and target schools</li>
              <li>You'll receive personalized recommendations for your MBA journey</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our <a href="https://gradprix.com/resources.html" style="color: #c9a961;">blog</a> for insights on the MBA application process.</p>
          
          <p>If you have any urgent questions, don't hesitate to reply to this email or call us at <strong>+44 7865 267776</strong>.</p>
          
          <p>Best regards,<br><strong>The GradPrix Team</strong></p>
        </div>
        
        <div class="footer">
          <p style="margin: 0; color: #666;">Follow us for MBA tips & insights</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/company/gradprix/">LinkedIn</a> |
            <a href="https://www.instagram.com/gradprix.official/">Instagram</a>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            © 2026 GradPrix. All rights reserved.<br>
            London, UK
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const plainBody = `
Hi ${data.firstName},

Thank you for reaching out to GradPrix! We've received your consultation request and one of our MBA admissions experts will be in touch within 24 hours.

YOUR REQUEST SUMMARY
- Target Schools: ${data.targetSchools}
- Application Round: ${formatApplicationRound(data.applicationRound)}
- Service Interest: ${formatService(data.service)}

WHAT HAPPENS NEXT?
1. A team member will reach out to schedule your free consultation
2. We'll discuss your background, goals, and target schools
3. You'll receive personalized recommendations for your MBA journey

If you have any urgent questions, don't hesitate to reply to this email or call us at +44 7865 267776.

Best regards,
The GradPrix Team

---
Follow us:
LinkedIn: https://www.linkedin.com/company/gradprix/
Instagram: https://www.instagram.com/gradprix.official/

© 2026 GradPrix. All rights reserved.
  `;
  
  GmailApp.sendEmail(
    data.email,
    subject,
    plainBody,
    {
      name: SENDER_NAME,
      htmlBody: htmlBody
    }
  );
}

/**
 * Helper: Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Helper: Format application round value
 */
function formatApplicationRound(value) {
  const rounds = {
    'r1-2026': 'Round 1 - 2026',
    'r2-2026': 'Round 2 - 2026',
    'r3-2026': 'Round 3 - 2026',
    'r1-2027': 'Round 1 - 2027',
    'exploring': 'Still Exploring'
  };
  return rounds[value] || value || 'Not selected';
}

/**
 * Helper: Format service value
 */
function formatService(value) {
  const services = {
    'comprehensive': 'Comprehensive Package',
    'essays': 'Essay Coaching',
    'interview': 'Interview Preparation',
    'resume': 'Resume Review',
    'assessment': 'Profile Assessment',
    'unsure': 'Not Sure Yet'
  };
  return services[value] || value || 'Not selected';
}

/**
 * Helper: Format date for display
 */
function formatDate(isoString) {
  if (!isoString) return new Date().toLocaleString();
  const date = new Date(isoString);
  return date.toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

/**
 * Test function - Use this to test the full functionality (Sheet + Emails)
 * Run this from the Apps Script editor to verify everything is working
 */
function testFullSubmission() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'praveg@gradprix.com', // Change to your email for testing
    phone: '+1 234 567 890',
    targetSchools: 'Harvard, Stanford, Wharton',
    applicationRound: 'r1-2026',
    service: 'comprehensive',
    message: 'This is a test message to verify the full functionality is working correctly.',
    newsletter: 'Yes',
    submittedAt: new Date().toISOString()
  };
  
  // Log to sheet
  logToSheet(testData);
  console.log('Data logged to sheet!');
  
  // Send emails
  sendTeamNotification(testData);
  sendUserConfirmation(testData);
  console.log('Emails sent successfully!');
  
  console.log('Full test completed!');
}

/**
 * Test function - Only test sheet logging (no emails)
 */
function testSheetOnly() {
  const testData = {
    firstName: 'Sheet',
    lastName: 'Test',
    email: 'test@example.com',
    phone: '+1 999 999 9999',
    targetSchools: 'LBS, INSEAD, Oxford',
    applicationRound: 'r2-2026',
    service: 'essays',
    message: 'Testing sheet logging only.',
    newsletter: 'No',
    submittedAt: new Date().toISOString()
  };
  
  logToSheet(testData);
  console.log('Test data logged to sheet successfully!');
}
