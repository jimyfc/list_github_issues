export interface Issue {
  id: number;
  title: string;
  state: 'open' | 'closed';
  url: string;
  html_url: string;
  number: number;
  created_at: string;
  updated_at: string;
  body?: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: {
    id: number;
    name: string;
    color: string;
    description?: string;
  }[];
}

export interface IssuesState {
  issues: Issue[];
  page: number;
  hasNextPage: boolean;
  loading: boolean;
  error: string | null;
}
