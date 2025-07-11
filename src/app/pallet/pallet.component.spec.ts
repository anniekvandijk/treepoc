import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletComponent } from './pallet.component';

describe('PalletComponent', () => {
  let component: PalletComponent;
  let fixture: ComponentFixture<PalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
