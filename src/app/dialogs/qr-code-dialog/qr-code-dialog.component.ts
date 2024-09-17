import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QrCodeService } from '../../services/common/qr-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseDialog } from '../base/base-dialog';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
})
export class QrCodeDialogComponent implements OnInit {
  id: string;
  qrCodeSafeUrl: SafeUrl;
  constructor(
    private qrCodeService:QrCodeService,
    private domSanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private baseDialog:BaseDialog){
      this.baseDialog.selectedId$.subscribe(id=>{
        this.id=id
        })
    }

  async ngOnInit(){
    this.spinner.show(SpinnerType.Cog)
    const qrCodeBlob: Blob = await this.qrCodeService.getQrCodeToProduct(this.id);
    const url: string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.Cog)

  }

}
