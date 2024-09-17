import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {

  frm: FormGroup
  constructor(spinner: NgxSpinnerService, private formBuilder: FormBuilder, private userService: UserService, private toastr: CustomToastrService) {
    super(spinner);
    this.showSpinner(SpinnerType.Fire)
  }
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      name: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]],
      surname: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required,
      ]],
      passwordAgain: ["", [
        Validators.required,
      ]]

    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordAgain").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }
  submitted: boolean = false;
  get component() {
    return this.frm.controls
  }
  async onSubmit(user: User) {
    this.submitted = true;
    this.showSpinner(SpinnerType.Timer)
    await this.userService.createUser(user, () => {
      this.hideSpinner(SpinnerType.Timer)
      this.toastr.message("Kayıt başarılı bir şekilde oluştu", "Kayıt Başarılı", {
        toastrMessageType: ToastrMessageType.Success,
        toastrMessagePosition: ToastrMessagePosition.TopRight
      })
    }, (errorMessages: string[]) => {
      this.hideSpinner(SpinnerType.Timer)
      errorMessages.forEach((v, i) => {
        this.toastr.message(v, "Kayıt Başarısız", {
          toastrMessagePosition: ToastrMessagePosition.TopRight,
          toastrMessageType: ToastrMessageType.Error
        })
      })

    })
  }

}
