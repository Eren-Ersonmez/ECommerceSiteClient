import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";

export class BaseDialog {

    readonly dialog=inject(MatDialog)
    openDialog(dialogComponent,afterClosed:()=>void) {
        const dialogRef = this.dialog.open(dialogComponent,);
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
             afterClosed()
          }
        });
      }
      private selectedIdSource = new BehaviorSubject<string|any>(null);
      selectedId$ = this.selectedIdSource.asObservable();
    
      setSelectedId(id: string|any): void {
        this.selectedIdSource.next(id);
      }
}
