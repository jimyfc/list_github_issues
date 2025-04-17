import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, InputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar con valores por defecto', () => {
    expect(component.label).toBe('');
    expect(component.type).toBe('text');
    expect(component.placeholder).toBe('');
    expect(component.required).toBeFalsy();
    expect(component.disabled).toBeFalsy();
  });

  it('debe actualizar el modelo cuando writeValue es llamado', () => {
    const testValue = 'test value';
    component.writeValue(testValue);
    expect(component.model).toBe(testValue);
  });

  it('debe llamar a onChange cuando el valor del input cambia', () => {
    const testValue = 'nuevo valor';
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(mockOnChange).toHaveBeenCalledWith(testValue);
  });

  it('debe registrar la función onChange', () => {
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);
    expect(component.onChange).toBe(mockFn);
  });

  it('debe registrar la función onTouched', () => {
    const mockFn = jest.fn();
    component.registerOnTouched(mockFn);
    expect(component.onTouched).toBe(mockFn);
  });

  it('debe aplicar las propiedades de entrada correctamente', async () => {
    component.label = 'Test Label';
    component.type = 'password';
    component.placeholder = 'Test Placeholder';
    component.required = true;
    component.disabled = true;

    fixture.detectChanges();
    await fixture.whenStable();
    
    const inputEl = fixture.debugElement.query(By.css('input'));
    const labelEl = fixture.debugElement.query(By.css('label'));
    
    expect(inputEl.nativeElement.getAttribute('type')).toBe('password');
    expect(inputEl.nativeElement.getAttribute('placeholder')).toBe('Test Placeholder');
    expect(inputEl.nativeElement.hasAttribute('required')).toBeTruthy();
    expect(inputEl.nativeElement.hasAttribute('disabled')).toBeTruthy();
    expect(labelEl.nativeElement.textContent.trim()).toBe('Test Label');
  });
});