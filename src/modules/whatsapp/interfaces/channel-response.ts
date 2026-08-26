export interface ChannelResponse {
  id: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  name: string;
  channelTypeId: string;
  companyId?: string | null;
  channelIdentifier: string | null;
  host?: string | null;
  port?: number | null;
  username?: string | null;
  password?: string | null;
  secure: boolean;
  channelType: ChannelTypeResponse;
  whatsappCreds: WhatsappCredResponse[];
}

export interface ChannelTypeResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  code: string;
}

export interface WhatsappCredResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  channelId: string;
  whatsappCredId: string;
}
