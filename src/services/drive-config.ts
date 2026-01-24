import apiKeyData from './apikey.json';
import type { DriveConfig } from './google-drive-service';

// Extract credentials from apikey.json
const { client_id, apiKey } = apiKeyData.web;
const FOLDER_ID = '1lZS3Fc4JFLDot1CQ3OfmusTkQKuWV_nm'; 

export const driveConfig: DriveConfig = {
  clientId: client_id,
  apiKey: apiKey,
  folderId: FOLDER_ID,
};
