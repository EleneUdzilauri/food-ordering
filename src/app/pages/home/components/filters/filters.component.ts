import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

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

  vegetarian: boolean = false;
  nuts: boolean = true;
  spiciness: number = 0;

  @Output() products = new EventEmitter<Array<Product>>();

  categoriesArray: Array<{}> = [{}];

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

  getFilteredProducts(categoryName: string, categoryValue: boolean): void {

    this.categoriesArray?.push({[categoryName]: categoryValue})

    this.filteredCategoriesSubscription = 
      this.storeService.getAllFiltered(this.categoriesArray)
        .subscribe((_products) => {
          this.products.emit(_products)
        })
  
    //// 
  }

  onNutsChoose(categoryKey: string): void {    
    this.nuts = !this.nuts
    
    this.getFilteredProducts(categoryKey, this.nuts)
    
  }

  onVeganChoose(categoryKey: string): void {
    this.vegetarian = !this.vegetarian
    this.getFilteredProducts(categoryKey, this.vegetarian)
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
