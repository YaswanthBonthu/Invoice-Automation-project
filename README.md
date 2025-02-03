# Invoice Reminder System

## Overview

This project is a **SaaS-based Invoice Reminder System** that allows users to log in using **Google OAuth**, view their due invoices, and automate the process of sending reminders and follow-ups through **Zapier**. This solution aims to help businesses streamline their invoice reminder process, improving customer engagement and ensuring timely payments.

The system is built with a **Node.js backend** and a **React frontend**. It integrates with **Zapier** for automating email reminders and follow-ups based on past-due invoices.

## Features

- **Google OAuth Login**: Allows users to authenticate using their Google account.
- **Invoice Management**: Displays a list of due invoices, including details such as invoice amount, due date, and recipient information.
- **Automation via Zapier**: Automatically triggers email reminders and follow-ups through Zapier for past-due invoices.
- **Manual Trigger**: Users can manually trigger the automation for sending reminders.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js
- **Authentication**: Google OAuth 2.0
- **Automation**: Zapier
- **Database**: MongoDB or PostgreSQL (adjust according to your setup)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [npm](https://npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Invoice-Automation/backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and set the following environment variables:

GOOGLE_CLIENT_ID: Google OAuth Client ID
GOOGLE_CLIENT_SECRET: Google OAuth Client Secret
MONGO_URI: MongoDB connection string (or PostgreSQL if used)
ZAPIER_WEBHOOK_URL: Zapier webhook URL for automation
Start the backend server:

bash
Copy
Edit
npm start
The backend service will be available at http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and set the following environment variables:

REACT_APP_BACKEND_URL: URL of your backend (e.g., http://localhost:5000)
Start the frontend server:

bash
Copy
Edit
npm start
The frontend service will be available at http://localhost:3000.

API Endpoints
1. User Authentication (Google OAuth)
POST /auth/google: Handles Google OAuth login and returns an authenticated session.

Request: OAuth authorization token
Response: User session with authentication details (access token, user info).

2. Invoice Management
GET /invoices: Fetches a list of due invoices for the authenticated user.

Request: User token (from Google OAuth)
Response: List of invoices (including invoice amount, due date, recipient info).

3. Trigger Automation (Zapier Integration)
POST /trigger-automation: Trigger the automation workflow in Zapier for sending email reminders and follow-ups.

Request: Invoice data (e.g., past-due invoices)
Response: Confirmation of the automation trigger.

Usage
Log in using your Google account to authenticate.
View due invoices that need to be paid.
Manually trigger the automation to send reminders to the recipients.
Zapier Automation will handle the process of sending follow-up emails to recipients.
Optional Features (Bonus Points)
Scheduling Automation: Set up recurring invoice reminders.
Email Template Customization: Allow users to customize the content of the reminder emails.
Reminder Status Tracking: Track and display the status of the sent reminders and follow-ups.
Zapier Integration
Create a Zap in Zapier.
Set the trigger to "Webhooks by Zapier" and choose the "Catch Hook" event.
Copy the provided webhook URL and paste it into the ZAPIER_WEBHOOK_URL in the backend .env file.
Configure the actions to send email reminders for past-due invoices.

Acknowledgments
Google OAuth for authentication
Zapier for automation
MongoDB (or PostgreSQL) for database management








