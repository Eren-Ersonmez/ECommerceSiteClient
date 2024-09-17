import { Directive, ElementRef, EventEmitter, HostListener, Input, Renderer2, inject } from '@angular/core';
import { HttpClientService } from '../../../services/common/http-client.service';
import { SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../services/admin/alertify.service';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { BaseDialog } from '../../../dialogs/base/base-dialog';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Input() id: string;
  @Input() controller: string;
  @Input() callback: EventEmitter<any> = new EventEmitter
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private baseDialog:BaseDialog
  ) {

    const img = renderer.createElement("img");
    img.setAttribute("src", "assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25
    renderer.appendChild(element.nativeElement, img);

  }


  @HostListener("click")
  onClick() {
    this.baseDialog.openDialog(DeleteDialogComponent,async ()=>{
      this.spinner.show(SpinnerType.Timer)
      const td: HTMLTableCellElement = this.element.nativeElement
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(() => {
        $(td.parentElement).fadeOut(2000, () => {
          this.spinner.hide(SpinnerType.Timer)
          this.callback.emit()
          this.alertify.message("Başarılı bir şekilde silindi", {
            messageType: AlertifyMessageType.Success,
            messagePosition: AlertifyMessagePosition.TopRight
          })
        })
  
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.Timer)
        this.callback.emit()
        this.alertify.message("Silinirken bir hata oluştu", {
          messageType: AlertifyMessageType.Error,
          messagePosition: AlertifyMessagePosition.TopRight
        })
      })
    })

  }
}

