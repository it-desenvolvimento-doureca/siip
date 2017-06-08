import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageloginComponent } from './pagelogin.component';

describe('PageloginComponent', () => {
  let component: PageloginComponent;
  let fixture: ComponentFixture<PageloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
