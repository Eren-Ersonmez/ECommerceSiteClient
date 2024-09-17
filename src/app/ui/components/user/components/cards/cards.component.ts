import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../../../../../services/common/models/credit-card.service';
import { ListCreditCard } from '../../../../../contracts/models/creditCard/list-credit-card';
import { BaseDialog } from '../../../../../dialogs/base/base-dialog';
import { EditCreditCardDialogComponent } from '../../../../../dialogs/edit-credit-card-dialog/edit-credit-card-dialog.component';
import { AddCreditCardDialogComponent } from '../../../../../dialogs/add-credit-card-dialog/add-credit-card-dialog.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  cards:ListCreditCard[]=[];
  constructor(private creditCardService:CreditCardService,private baseDialog:BaseDialog){}

async ngOnInit(){
   await this.getCreditCards();
  }

async getCreditCards(){
  this.cards=(await this.creditCardService.getUserCreditCard()).data
}

editCreditCard(){
 this.baseDialog.openDialog(EditCreditCardDialogComponent,()=>{})
}
addCreditCard(){
  this.baseDialog.openDialog(AddCreditCardDialogComponent,()=>{})
}
}
