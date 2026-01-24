import apiKeyData from './apikey.json';
import type { DriveConfig } from './google-drive-service';

// Extract credentials from apikey.json
const { client_id, apiKey } = apiKeyData.web;

// Your Google Drive folder ID where invoices will be stored
// TODO: Replace with your actual folder ID from Google Drive
const FOLDER_ID = '1h18CGkwxJvFrb-cLST4CJGq4rsjXUjSP'; // Replace this with your actual folder ID

export const driveConfig: DriveConfig = {
  clientId: client_id,
  apiKey: apiKey,
  folderId: FOLDER_ID,
};
