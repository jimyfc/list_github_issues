export interface Issue {
  id: number;
  title: string;
  state: 'open' | 'closed';
  url: string;
  user: {
    login: string;
  };
}

export interface IssuesState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}
