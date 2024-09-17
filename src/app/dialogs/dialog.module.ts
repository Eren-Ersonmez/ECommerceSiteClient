import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseDialog } from './base/base-dialog';
import { SelectProductImagesDialogComponent } from './select-product-images-dialog/select-product-images-dialog.component';
import { FileUploadModule } from "../services/common/file-upload/file-upload.module";
import {MatCardModule} from '@angular/material/card';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule} from '@angular/material/toolbar';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';
import { QrCodeReadingDialogComponent } from './qr-code-reading-dialog/qr-code-reading-dialog.component'
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';
import { ProductFeaturesDialogComponent } from './product-features-dialog/product-features-dialog.component';
import { AddAddressDialogComponent } from './add-address-dialog/add-address-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAddressDialogComponent } from './edit-address-dialog/edit-address-dialog.component';
import { EditCreditCardDialogComponent } from './edit-credit-card-dialog/edit-credit-card-dialog.component';
import { AddCreditCardDialogComponent } from './add-credit-card-dialog/add-credit-card-dialog.component';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent,
    SelectProductImagesDialogComponent,
    OrderDetailsDialogComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    QrCodeDialogComponent,
    QrCodeReadingDialogComponent,
    EditCategoryDialogComponent,
    ProductFeaturesDialogComponent,
    AddAddressDialogComponent,
    EditAddressDialogComponent,
    EditCreditCardDialogComponent,
    AddCreditCardDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FileUploadModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectionList,
    NgxScannerQrcodeModule,
    ReactiveFormsModule
],
  providers:[
    BaseDialog
  ]
})
export class DialogModule { }
