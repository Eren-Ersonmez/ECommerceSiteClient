import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditCardDialogComponent } from './add-credit-card-dialog.component';

describe('AddCreditCardDialogComponent', () => {
  let component: AddCreditCardDialogComponent;
  let fixture: ComponentFixture<AddCreditCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCreditCardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
