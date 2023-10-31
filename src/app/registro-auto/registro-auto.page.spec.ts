import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAutoPage } from './registro-auto.page';

describe('RegistroAutoPage', () => {
  let component: RegistroAutoPage;
  let fixture: ComponentFixture<RegistroAutoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroAutoPage);
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