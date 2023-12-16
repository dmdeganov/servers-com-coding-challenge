export interface Message {
  id: number;
  text: string;
  authorId: number;
  time: number;
  authorName: string;
}

export interface FilterParams {
  text?: string;
  authorId?: number;
  date?: string;
}

export interface FetchMessagesResponse {
  messages: Message[];
  minDate: number;
  maxDate: number;
}

export interface AuthorDetailed {
  name: string;
  age: number;
  phone: string;
  email: string;
  photo: string;
  id: number;
}
