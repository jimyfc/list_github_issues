import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar con valores por defecto', () => {
    expect(component.currentPage).toBe(1);
    expect(component.hasNextPage).toBeFalsy();
  });

  it('debe emitir el cambio de página cuando las condiciones son válidas', () => {
    const nextPage = 2;
    component.hasNextPage = true;
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');

    component.changePage(nextPage);

    expect(pageChangeSpy).toHaveBeenCalledWith(nextPage);
  });

  it('no debe emitir el cambio si la página es menor a 1', () => {
    const invalidPage = 0;
    component.hasNextPage = true;
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');

    component.changePage(invalidPage);

    expect(pageChangeSpy).not.toHaveBeenCalled();
  });

  it('no debe emitir el cambio si no hay página siguiente', () => {
    const nextPage = 2;
    component.hasNextPage = false;
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');

    component.changePage(nextPage);

    expect(pageChangeSpy).not.toHaveBeenCalled();
  });

  it('no debe emitir el cambio si la página es igual a la actual', () => {
    component.currentPage = 1;
    component.hasNextPage = true;
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');

    component.changePage(1);

    expect(pageChangeSpy).not.toHaveBeenCalled();
  });

  it('debe actualizar la página cuando se hace clic en el botón siguiente', () => {
    component.currentPage = 1;
    component.hasNextPage = true;
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.detectChanges();

    component.changePage(component.currentPage + 1);
    
    expect(pageChangeSpy).toHaveBeenCalledWith(2);
  });

  it('debe tener botones de paginación en el template', () => {
    component.currentPage = 1;
    component.hasNextPage = true;
    fixture.detectChanges();

    const currentPageElement = fixture.debugElement.query(By.css('.current-page'));
  
    expect(currentPageElement.nativeElement.textContent.trim()).toBe('1');
  });
});