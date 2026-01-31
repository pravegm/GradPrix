# GradPrix Contact Form - Google Apps Script Setup

This guide will help you set up the automated email system for the GradPrix contact form.

## Overview

When a user submits the contact form on your website:
1. The form data is sent to a Google Apps Script web app
2. The script sends a notification email to the team (praveg@, rajat@, rangolie@gradprix.com)
3. The script sends a confirmation email to the user

All emails are sent **from** `support@gradprix.com`.

---

## Step 1: Create the Google Apps Script

1. **Sign in to Google** with `support@gradprix.com` (this account will send the emails)

2. Go to [Google Apps Script](https://script.google.com)

3. Click **"New Project"**

4. Delete any default code in the editor

5. Copy the entire contents of `contact-form-handler.gs` and paste it into the editor

6. Click on "Untitled project" at the top and rename it to **"GradPrix Contact Form Handler"**

7. Click **File > Save** (or Ctrl/Cmd + S)

---

## Step 2: Deploy as Web App

1. In the Apps Script editor, click **Deploy > New deployment**

2. Click the gear icon ⚙️ next to "Select type" and choose **"Web app"**

3. Configure the deployment:
   - **Description**: "GradPrix Contact Form v1"
   - **Execute as**: "Me (support@gradprix.com)"
   - **Who has access**: "Anyone"

4. Click **Deploy**

5. You'll be asked to **authorize** the script:
   - Click "Authorize access"
   - Select your `support@gradprix.com` account
   - Click "Advanced" > "Go to GradPrix Contact Form Handler (unsafe)"
   - Click "Allow"

6. **Copy the Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 3: Update Your Website

1. Open `assets/js/main.js` in your code editor

2. Find this line near the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```

3. Replace it with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```

4. Save the file and deploy your website

---

## Step 4: Test the Integration

### Option A: Test from Apps Script (Recommended First)

1. In the Apps Script editor, find the `testEmailSending` function at the bottom

2. Click the **Run** button (▶️) while that function is selected

3. Check the inbox of `praveg@gradprix.com` for the test email

### Option B: Test from Your Website

1. Go to your live contact page

2. Fill out the form with test data

3. Submit the form

4. Verify:
   - Team members receive the notification email
   - The test user receives a confirmation email

---

## Troubleshooting

### "Script authorization required" Error
- Make sure you authorized the script in Step 2
- Re-deploy the script if needed

### Emails not being received
1. Check the spam folder
2. In Apps Script, go to **View > Executions** to see logs
3. Make sure the script is deployed with "Anyone" access

### Form submission shows error
1. Check browser console for errors (F12 > Console)
2. Verify the GOOGLE_SCRIPT_URL is correct in main.js
3. Make sure the URL ends with `/exec` (not `/dev`)

### CORS Error
The form uses `mode: 'no-cors'` which should prevent CORS issues. If you still see errors:
1. Make sure you're using the production URL (`/exec` not `/dev`)
2. Verify the deployment has "Anyone" access

---

## Updating the Script

If you need to make changes:

1. Edit the code in Apps Script

2. Click **Deploy > Manage deployments**

3. Click the **pencil icon** ✏️ to edit the current deployment

4. Change "Version" to "New version"

5. Click **Deploy**

**Important**: The URL stays the same, so you don't need to update your website.

---

## Email Templates

The script includes two beautifully formatted HTML email templates:

1. **Team Notification** - Sent to all three team members with:
   - Contact details with quick reply link
   - All form fields
   - Submission timestamp

2. **User Confirmation** - Sent to the person who submitted the form with:
   - Thank you message
   - Request summary
   - Next steps
   - Contact information

To customize the templates, edit the `sendTeamNotification` and `sendUserConfirmation` functions in the script.

---

## Security Notes

- The script only accepts POST requests with valid JSON data
- All user input is escaped to prevent XSS attacks
- The script runs under your Google Workspace account's security policies
- Google Apps Script has built-in rate limiting

---

## Support

If you need help with setup:
- Check Google's [Apps Script documentation](https://developers.google.com/apps-script)
- Review the execution logs in Apps Script for error details
