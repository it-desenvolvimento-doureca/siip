import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoQuantidadesComponent } from './registo-quantidades.component';

describe('RegistoQuantidadesComponent', () => {
  let component: RegistoQuantidadesComponent;
  let fixture: ComponentFixture<RegistoQuantidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistoQuantidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistoQuantidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
