import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: MockStore;
  const initialState = { auth: { token: null } };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('debería almacenar el token en localStorage después de un login exitoso', (done) => {
      const mockResponse = { jwt: 'fake-token', user: 'test-user' };
      const credentials = { identifier: 'test@test.com', password: 'password123' };

      service.login(credentials.identifier, credentials.password).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          expect(localStorage.getItem('authToken')).toBe(mockResponse.jwt);
          done();
        }
      });

      const req = httpMock.expectOne('http://localhost:1337/api/auth/local');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('debería eliminar el token del localStorage', () => {
      localStorage.setItem('authToken', 'fake-token');
      service.logout();
      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });

  describe('getToken', () => {
    it('debería devolver el token desde localStorage', () => {
      const testToken = 'test-token';
      localStorage.setItem('authToken', testToken);
      expect(service.getToken()).toBe(testToken);
    });

    it('debería devolver null si no existe token', () => {
      localStorage.clear();
      expect(service.getToken()).toBeNull();
    });
  });
});