import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [
  ]
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  categories = ['shoes', 'sports'];

  // onShowCategory(category: string): void {
  //   console.log(category);
  //   console.log(this.showCategory);
    
  //   this.showCategory.emit(category)
    
  // }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }

}
