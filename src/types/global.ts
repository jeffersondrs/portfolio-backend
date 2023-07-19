import { Request } from 'express';

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userOthers: UserOthersInfos;
}

export interface UserOthersInfos {
  job: string;
  state: string;
  city: string;
  image: string;
  phone: string;
  social: SocialMedia[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialMedia {
  name: string;
  url: string;
}

export interface UserDocument extends User, Document {
  comparePassword(password: string): Promise<boolean>;
}

export interface AuthenticatedRequest extends Request {
  userId: string;
}