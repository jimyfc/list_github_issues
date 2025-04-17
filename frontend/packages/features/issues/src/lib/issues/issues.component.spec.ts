import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IssuesComponent } from './issues.component';
import * as IssuesActions from '../+state/issues.actions';
import * as AuthActions from '@github-issues/auth';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let store: MockStore;

  const initialState = {
    issues: {
      entities: {},
      ids: [],
      loading: false,
      error: null,
      page: 1,
      hasNextPage: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar issues cuando se llama a loadIssues', () => {
    const repoUrl = 'https://github.com/user/repo';
    const page = 1;
    const spy = jest.spyOn(store, 'dispatch');
    component.repoUrl = repoUrl;

    component.loadIssues(page);

    expect(spy).toHaveBeenCalledWith(
      IssuesActions.loadIssues({ repoUrl, page })
    );
  });

  it('debe cargar nueva página cuando se llama a onChangePage', () => {
    const repoUrl = 'https://github.com/user/repo';
    const page = 2;
    const spy = jest.spyOn(store, 'dispatch');
    component.repoUrl = repoUrl;

    component.onChangePage(page);

    expect(spy).toHaveBeenCalledWith(
      IssuesActions.loadIssues({ repoUrl, page })
    );
  });

  it('debe hacer logout cuando se llama a logout', () => {
    const spy = jest.spyOn(store, 'dispatch');

    component.logout();

    expect(spy).toHaveBeenCalledWith(AuthActions.logout());
  });

  it('debe mostrar loading mientras carga los issues', () => {
    store.setState({
      issues: {
        ...initialState.issues,
        loading: true,
      },
    });

    fixture.detectChanges();

    let loading: boolean | undefined;
    component.loading$.subscribe((value) => (loading = value));
    expect(loading).toBeTruthy();
  });

  it('debe mostrar error cuando falla la carga', () => {
    const errorMessage = 'Error loading issues';
    store.setState({
      issues: {
        ...initialState.issues,
        error: errorMessage,
      },
    });

    fixture.detectChanges();

    let error: string | null | undefined;
    component.error$.subscribe((value) => (error = value));
    expect(error).toBe(errorMessage);
  });
});
