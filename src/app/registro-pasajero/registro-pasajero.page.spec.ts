import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPasajeroPage } from './registro-pasajero.page';

describe('RegistroPasajeroPage', () => {
  let component: RegistroPasajeroPage;
  let fixture: ComponentFixture<RegistroPasajeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
} 
