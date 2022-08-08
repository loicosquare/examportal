import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories : any = [];

  constructor(private categorySerbice: CategoryService) { }

  ngOnInit(): void {
    this.categorySerbice.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err: HttpErrorResponse) => alert(err.message)
    })
  }

}
