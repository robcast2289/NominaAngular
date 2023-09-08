import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUsuarioComponent } from './status-usuario.component';

describe('StatusUsuarioComponent', () => {
  let component: StatusUsuarioComponent;
  let fixture: ComponentFixture<StatusUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
