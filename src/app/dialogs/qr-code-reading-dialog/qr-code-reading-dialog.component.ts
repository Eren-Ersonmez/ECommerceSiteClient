import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/ui/custom-toastr.service';
import { ProductService } from '../../services/common/models/product.service';
declare var $: any;
@Component({
  selector: 'app-qr-code-reading-dialog',
  templateUrl: './qr-code-reading-dialog.component.html',
  styleUrl: './qr-code-reading-dialog.component.scss'
})
export class QrCodeReadingDialogComponent implements OnInit,OnDestroy {
  @ViewChild("scanner",{static:true}) scanner:NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;

  constructor(private spinner:NgxSpinnerService,private productService:ProductService,private toastrService:CustomToastrService) {}
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  ngOnInit(): void {
   this.scanner.start();
  }
  onEvent(e){
    this.spinner.show(SpinnerType.BallSpinRotate)
    const data: any = (e as Array<{ value: string }>)[0].value;
    debugger;
    if (data != null && data != "") {
      debugger;
      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;

      this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue), () => {
        $("#btnClose").click();
        this.toastrService.message(`${jsonData.Name} ürünün stok bilgisi '${stockValue}' olarak güncellenmiştir.`, "Stok Başarıyla Güncellendi", {
          toastrMessageType: ToastrMessageType.Success,
          toastrMessagePosition: ToastrMessagePosition.TopRight
        });

        this.spinner.hide(SpinnerType.BallSpinRotate)
      });
    }
    this.spinner.hide(SpinnerType.BallSpinRotate)
  }


}
