import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() hasNextPage = false;

  @Output() pageChange = new EventEmitter<number>();

  changePage(page: number) {
    if (page >= 1 && this.hasNextPage && page !== this.currentPage) {
      console.log("new page", page);
      
      this.pageChange.emit(page);
    }
  }
}
