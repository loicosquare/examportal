import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category/category.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {}

  addCategory() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open('Title is required', 'Ok', {
        duration: 2000,
      });
      return;
    }
    this.categoryService.addCategory(this.category).subscribe({
      next: (data) => {
        this.category.title = '',
        this.category.description ='',
        this.notifier.onSuccess("Categorie ajoutée avec succès");
      },
      error: (error : HttpErrorResponse) => this.notifier.onError(error.message)
    })
  }
}
