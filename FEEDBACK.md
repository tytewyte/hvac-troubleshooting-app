# Feedback Collection System

## Overview

The HVAC Troubleshooting App now includes a feedback collection system to gather user input when the application is publicly accessible. This document explains how the feedback system works and how to manage the collected feedback.

## How It Works

1. **User Interface**:
   - A "Provide Feedback" button is displayed in the footer of the application
   - When clicked, a modal form appears allowing users to submit feedback
   - Users can provide their name and email (optional), select a feedback type, and write their message

2. **Data Collection**:
   - Feedback is sent to the server via the `/api/feedback` endpoint
   - Each submission is stored as a JSON file in the `feedback` directory
   - Feedback is also stored in the browser's localStorage as a backup

3. **Data Storage**:
   - Feedback files are named with a timestamp: `feedback_[timestamp].json`
   - Each file contains the user's feedback along with metadata (timestamp, IP address, user agent)
   - The `feedback` directory is excluded from version control via `.gitignore` for privacy

## Managing Feedback

### Viewing Feedback

To view collected feedback:

1. Check the `feedback` directory on your server
2. Each JSON file contains a complete feedback submission
3. You can use any JSON viewer or text editor to read the feedback

### Analyzing Feedback

For larger deployments, consider implementing a feedback dashboard by:

1. Creating a secure admin route to view feedback submissions
2. Implementing filtering and sorting capabilities
3. Adding analytics to identify common issues or suggestions

### Privacy Considerations

1. The feedback system collects minimal personal information (name and email are optional)
2. IP addresses are collected for abuse prevention but should be handled according to your privacy policy
3. Consider implementing data retention policies to automatically delete old feedback after a certain period

## Extending the Feedback System

The current implementation provides a basic feedback collection system. Consider these enhancements:

1. **Email Notifications**: Send email alerts when new feedback is received
2. **Categorization**: Add more detailed categorization options
3. **User Association**: Link feedback to user accounts when submitted by logged-in users
4. **Response System**: Allow administrators to respond to feedback
5. **Analytics**: Implement feedback analytics to identify trends

## Troubleshooting

If feedback submissions are not being saved:

1. Check server logs for errors
2. Ensure the `feedback` directory is writable by the application
3. Verify the API endpoint is accessible
4. Check browser console for JavaScript errors