import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCmpComponent } from './user-cmp.component';

describe('UserCmpComponent', () => {
  let component: UserCmpComponent;
  let fixture: ComponentFixture<UserCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
