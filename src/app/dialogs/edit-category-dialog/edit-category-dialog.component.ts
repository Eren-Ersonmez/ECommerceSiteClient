import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/common/models/category.service';
import { ListCategory } from '../../contracts/models/categories/list-category';
import { BaseDialog } from '../base/base-dialog';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../services/admin/alertify.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss'
})
export class EditCategoryDialogComponent implements OnInit {
  categoryName:string;
  id: string;
  constructor(private categoryService:CategoryService,private baseDialog:BaseDialog,private alertify:AlertifyService){}
  ngOnInit(): void {
    this.baseDialog.selectedId$.subscribe(values=>{
      this.id=values.id,
      this.categoryName=values.name
      })
  }
 async edit(name:string){
  let category:ListCategory=new ListCategory();
  category.id=this.id
  category.name=name;
  await this.categoryService.edit(category,()=>{
    this.alertify.message("Kategori Güncellendi",{
      messagePosition:AlertifyMessagePosition.TopRight,
      messageType:AlertifyMessageType.Success
    })
  })
  }
}
