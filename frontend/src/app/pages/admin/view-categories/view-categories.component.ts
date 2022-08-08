import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories :any = [];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (data : any) => {
        (this.categories = data), console.log(this.categories);
      },
      error: (error:HttpErrorResponse) => {

      }
    })
  }

}
