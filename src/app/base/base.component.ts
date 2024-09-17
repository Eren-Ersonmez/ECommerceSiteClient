import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerType:SpinnerType){
    this.spinner.show(spinnerType);
    setTimeout(() => {
      this.hideSpinner(spinnerType)
    }, 750);
  }
  hideSpinner(spinnerType: SpinnerType) {
      this.spinner.hide(spinnerType)

  }
}
export enum SpinnerType{
  BallSpinFade="s1",
  BallSpinRotate="s2",
  Cog="s3",
  SquareJellyBox="s4",
  Timer="s5",
  LineSpinClockwiseFadeRotating="s6",
  Fire="s7"
}