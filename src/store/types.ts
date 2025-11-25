export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  about: string;
  profileUrl: string;
  skills: Array<string>;
  lastActiveAt: Date;
  isPremium: boolean;
  planType?: "SILVER" | "GOLD";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
export type RequestStatus = "interested" | "ignored" | "accepted" | "rejected";

export interface Request {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
