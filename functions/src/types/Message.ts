export interface Message {
  id?: string;
  body: string;
  uid: string;
  username: string;
  isOwner: boolean;
  created_at: number;
}
