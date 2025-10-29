export type Certificate = {
  id: string;
  ownerName: string;
  courseName: string;
  issuer: string;
  issueDate: string;
  contentHash: string;
  blockchain: {
    network: string;
    transactionHash: string;
    blockNumber: number;
  };
  metadata: {
    description: string;
    mediaUrl?: string;
  };
};

export type IssueCertificatePayload = {
  ownerName: string;
  courseName: string;
  issuer: string;
  issueDate?: string;
  metadata?: {
    description?: string;
    mediaUrl?: string;
  };
  attachmentName?: string;
  attachmentContent?: string;
};

export type IssueCertificateResponse = {
  certificate: Certificate;
  message: string;
};

export type VerifyCertificateResponse = {
  isValid: boolean;
  certificate?: Certificate;
  message: string;
};
