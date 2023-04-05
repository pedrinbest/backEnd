import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoAddEditComponent } from './produto-add-edit.component';
// Pedro Lucas
// Douglas Marinho
describe('ProdutoAddEditComponent', () => {
  let component: ProdutoAddEditComponent;
  let fixture: ComponentFixture<ProdutoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
