import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CheckoutService,
  I18nTestingModule,
  Order,
  PromotionLocation,
  FeaturesConfigModule,
  FeaturesConfig,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Item } from '../../../cart/cart-shared/cart-item/cart-item.component';
import { OrderConfirmationItemsComponent } from './order-confirmation-items.component';

import createSpy = jasmine.createSpy;
import { PromotionsModule } from '../../../checkout';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

@Component({ selector: 'cx-cart-item-list', template: '' })
class MockReviewSubmitComponent {
  @Input()
  items: Item[];
  @Input()
  isReadOnly: boolean;
  @Input()
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
}

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of({
      entries: [
        {
          entryNumber: 1,
          quantity: 1,
        },
      ],
    });
  }
}

class MockPromotionService {
  getOrderPromotions(): void {}
  getOrderPromotionsFromCart(): void {}
  getOrderPromotionsFromCheckout(): void {}
  getOrderPromotionsFromOrder(): void {}
  getProductPromotionForEntry(): void {}
}

describe('OrderConfirmationItemsComponent', () => {
  let component: OrderConfirmationItemsComponent;
  let fixture: ComponentFixture<OrderConfirmationItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, PromotionsModule, FeaturesConfigModule],
      declarations: [
        OrderConfirmationItemsComponent,
        MockReviewSubmitComponent,
      ],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: PromotionService, useClass: MockPromotionService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.3' },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should display items', () => {
    const items = () => fixture.debugElement.query(By.css('cx-cart-item-list'));
    component.ngOnInit();
    fixture.detectChanges();
    expect(items()).toBeTruthy();
  });
});
