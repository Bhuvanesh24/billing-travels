export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  thumbnailLink?: string;
}

const MOCK_FILES: DriveFile[] = [
  {
    id: '1',
    name: 'Invoice_001_JohnDoe.pdf',
    mimeType: 'application/pdf',
    createdTime: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Invoice_002_JaneSmith.pdf',
    mimeType: 'application/pdf',
    createdTime: '2024-01-16T14:30:00Z',
  },
  {
    id: '3',
    name: 'Invoice_003_BobJohnson.pdf',
    mimeType: 'application/pdf',
    createdTime: '2024-01-20T09:15:00Z',
  },
];

export const listInvoices = async (): Promise<DriveFile[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_FILES);
    }, 800);
  });
};
