import { TestBed } from '@angular/core/testing';

import { UserInterestsConnector } from './user-interests.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserInterestsAdapter } from './user-interests.adapter';
import createSpy = jasmine.createSpy;
import {
  ProductInterestEntryRelation,
  NotificationType,
} from '../../../model/product-interest.model';
import { Type } from '@angular/core';

class MockUserInterestsAdapter implements UserInterestsAdapter {
  getInterests = createSpy('getInterests').and.callFake(userId =>
    of(`loadList-${userId}`)
  );
  removeInterest = createSpy('removeInterest').and.returnValue(of([]));
  addInterest = createSpy('addInterest').and.stub();
}

describe('UserInterestsConnector', () => {
  let service: UserInterestsConnector;
  let adapter: UserInterestsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserInterestsAdapter, useClass: MockUserInterestsAdapter },
      ],
    });

    service = TestBed.get(UserInterestsConnector as Type<
      UserInterestsConnector
    >);
    adapter = TestBed.get(UserInterestsAdapter as Type<UserInterestsAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get interests should call adapter', () => {
    let result;
    service
      .getInterests(
        'user-id',
        10,
        0,
        'name:asc',
        '343898',
        NotificationType.BACK_IN_STOCK
      )
      .subscribe(res => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.getInterests).toHaveBeenCalledWith(
      'user-id',
      10,
      0,
      'name:asc',
      '343898',
      NotificationType.BACK_IN_STOCK
    );
  });

  it('remove interests should call adapter', () => {
    let result;
    const relationData: ProductInterestEntryRelation = {
      product: {},
      productInterestEntry: [],
    };
    service
      .removeInterest('user-id', relationData)
      .subscribe(res => (result = res));
    expect(result).toEqual([]);
    expect(adapter.removeInterest).toHaveBeenCalledWith(
      'user-id',
      relationData
    );
  });
});
