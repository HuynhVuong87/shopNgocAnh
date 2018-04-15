import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuseEcommerceOrderBuyComponent } from './order-buy.component';

describe('OrderBuyComponent', () => {
  let component: FuseEcommerceOrderBuyComponent;
  let fixture: ComponentFixture<FuseEcommerceOrderBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuseEcommerceOrderBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuseEcommerceOrderBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
