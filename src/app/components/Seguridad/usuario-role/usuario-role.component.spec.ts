import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRoleComponent } from './usuario-role.component';

describe('UsuarioRoleComponent', () => {
  let component: UsuarioRoleComponent;
  let fixture: ComponentFixture<UsuarioRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
