import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';
import { BaseDialog } from '../../../dialogs/base/base-dialog';
import { EditCategoryDialogComponent } from '../../../dialogs/edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private baseDialog:BaseDialog){}
  @ViewChild(ListComponent) listCompenet
  createdCategory(category){
     this.listCompenet.getCategories()
  }
}
