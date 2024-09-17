import { Component, inject, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { SpinnerType } from '../../../base/base.component';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { BaseDialog } from '../../../dialogs/base/base-dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() options: Partial<FileUploadOptions>;
  constructor(
    private httpService: HttpClientService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private toastr: CustomToastrService,
    private baseDialog:BaseDialog
  ) { }
  
  public files: NgxFileDropEntry[] = [];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData: FormData = new FormData();

    for (const droppedFile of files) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        formData.append('files', file, file.name);
      });
    }
    this.baseDialog.openDialog(FileUploadDialogComponent,()=>{
      this.spinner.show(SpinnerType.Fire);
      this.httpService.post({
        controller: this.options.controller,
        queryString:this.options.queryString,
        headers: new HttpHeaders({ 'responseType': 'blob' })
      }, formData).subscribe(() => {
        this.spinner.hide(SpinnerType.Fire);
        if (this.options.isAdminPage) {
          this.alertify.message("Dosyalar başarıyla yüklendi", {
            messageType: AlertifyMessageType.Success,
            messagePosition: AlertifyMessagePosition.TopRight,
            dismissOthers: true
          });
        } else {
          this.toastr.message("Dosyalar başarıyla yüklendi", "Başarılı", {
            toastrMessageType: ToastrMessageType.Success,
            toastrMessagePosition: ToastrMessagePosition.TopRight
          });
        }
      }, (errorMessage: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.Fire);
        if (this.options.isAdminPage) {
          this.alertify.message(errorMessage.message, {
            messageType: AlertifyMessageType.Error,
            messagePosition: AlertifyMessagePosition.TopRight,
            dismissOthers: true,
            delay: 5000
          });
        } else {
          this.toastr.message("Dosyalar yüklenirken beklenmeyen bir hata oluştu", "Başarısız", {
            toastrMessageType: ToastrMessageType.Error,
            toastrMessagePosition: ToastrMessagePosition.TopRight
          });
        }
      });
    })
   
  }
 
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  isAdminPage?: boolean = false;
  accept?: string;
}
