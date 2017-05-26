import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoUsersComponent } from './gestao-users.component';

describe('GestaoUsersComponent', () => {
  let component: GestaoUsersComponent;
  let fixture: ComponentFixture<GestaoUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
