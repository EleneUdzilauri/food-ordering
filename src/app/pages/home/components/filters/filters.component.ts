import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

type FilterFields = 'nuts' | 'vegeterian';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [
  ]
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  // categories = ['shoes', 'sports'];
  categoriesSubscription: Subscription | undefined;
  categories: Array<Category> | undefined;

  filteredCategoriesSubscription: Subscription | undefined;

  filteredCategoriesByIdSubscription: Subscription | undefined;

  spiciness: number = 0;

  @Output() products = new EventEmitter<Array<Product>>();

  categoriesFilter: Record<FilterFields, boolean> = {
    nuts: true,
    vegeterian: false
  };

  @Output() filteredProducts = new EventEmitter()

  categoryId: number = 0;

  constructor(private storeService: StoreService) {
  }


  // onShowCategory(category: string): void {
  //   this.showCategory.emit(category)
  // }

  ngOnInit(): void {
    this.getCategories()
    
  }

  getCategories(): void {
    this.categoriesSubscription = this.storeService.getAllCategories()
      .subscribe((_categories) => {
        this.categories = _categories
      })
  }

  getFilteredProducts(categoryName: FilterFields, categoryValue: boolean): void {

    this.categoriesFilter[categoryName] = categoryValue

    this.filteredCategoriesSubscription = 
      this.storeService.getAllFiltered(this.categoriesFilter)
        .subscribe((_products) => {
          this.products.emit(_products)
        })
  
    //// 
  }

  onNutsChoose(categoryKey: FilterFields): void {    
    this.categoriesFilter.nuts = !this.categoriesFilter.nuts
    
    this.getFilteredProducts(categoryKey, this.categoriesFilter.nuts)
    
  }

  onVeganChoose(categoryKey: FilterFields): void {
    this.categoriesFilter.vegeterian = !this.categoriesFilter.vegeterian
    this.getFilteredProducts(categoryKey, this.categoriesFilter.vegeterian)
  }


  getFilteredByCategoryId(categoryId: number): void {
    this.filteredCategoriesByIdSubscription = 
      this.storeService.getFilteredByCategory(categoryId)
        .subscribe((_products) => {
          const res = _products.filter((product) => product.categoryId === categoryId)
          this.products.emit(res)
        })
  }


  // ngOnDestroy(): void {
  //   if(this.filteredCategoriesSubscription){
  //     this.filteredCategoriesSubscription.unsubscribe()
  //   }
  // }

}
