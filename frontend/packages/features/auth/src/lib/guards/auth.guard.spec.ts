import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { authGuard } from './auth.guard';
import { mock } from 'node:test';

describe('AuthGuard', () => {
  const setupTest = () => {
    const mockStore = { select: jest.fn() };
    const mockRouter = { navigate: jest.fn() };
    const mockHttp = { get: jest.fn() };
    const mockActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: HttpClient, useValue: mockHttp },
      ],
    });

    return { mockStore, mockRouter, mockHttp, mockActivatedRouteSnapshot };
  };

  it('debe redirigir a /auth si no hay token', async () => {
    const { mockStore, mockRouter, mockActivatedRouteSnapshot } = setupTest();
    mockStore.select.mockReturnValue(of(null));

    TestBed.runInInjectionContext(async () => {
      const mockRouterStateSnapshot = { url: '/test-url', root: null } as any;
      const result = await authGuard(
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      );
      expect(result).toBeFalsy();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
    });
  });

  it('debe permitir acceso con token válido', async () => {
    const { mockStore, mockHttp } = setupTest();
    const token = 'token-valido';
    mockStore.select.mockReturnValue(of(token));
    mockHttp.get.mockReturnValue(of({}));

    TestBed.runInInjectionContext(async () => {
      const { mockActivatedRouteSnapshot } = setupTest();
      const mockRouterStateSnapshot = { url: '/test-url', root: null } as any;
      const result = await authGuard(
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      );
      expect(result).toBeTruthy();
      expect(mockHttp.get).toHaveBeenCalledWith(
        'http://localhost:1337/api/users/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );
    });
  });

  it('debe redirigir si el token es inválido', async () => {
    const mockActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
    } as any;

    const { mockStore, mockHttp, mockRouter } = setupTest();
    const token = 'token-invalido';
    mockStore.select.mockReturnValue(of(token));
    mockHttp.get.mockReturnValue(throwError(() => new Error('Error')));

    TestBed.runInInjectionContext(async () => {
      const result = await authGuard(mockActivatedRouteSnapshot, {} as any);
      expect(result).toBeFalsy();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
    });
  });
});
