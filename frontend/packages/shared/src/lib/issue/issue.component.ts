import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'shared-issue-card',
  standalone: true,
  templateUrl: './issue.component.html',
  imports: [CommonModule],
})
export class IssueCardComponent {
  @Input() issue!: Issue;
}