import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IssueCardComponent } from './issue.component';

describe('IssueCardComponent', () => {
  let component: IssueCardComponent;
  let fixture: ComponentFixture<IssueCardComponent>;

  const mockIssue = {
    id: 1,
    title: 'Test Issue',
    state: 'open' as 'open',
    url: 'http://api.github.com/repos/test/test/issues/1',
    html_url: 'http://github.com/test/test/issues/1',
    number: 1,
    created_at: '2024-04-17T10:00:00Z',
    updated_at: '2024-04-17T10:00:00Z',
    body: 'Test issue body',
    user: {
      login: 'testuser',
      avatar_url: 'http://github.com/testuser.png',
      html_url: 'http://github.com/testuser'
    },
    labels: [
      {
        id: 1,
        name: 'bug',
        color: 'ff0000',
        description: 'Bug label'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueCardComponent);
    component = fixture.componentInstance;
    component.issue = mockIssue;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el número y usuario del issue', () => {
    const infoText = fixture.debugElement.query(By.css('.card-text'));
    expect(infoText.nativeElement.textContent)
      .toContain(`#${mockIssue.number} abierto por ${mockIssue.user.login}`);
  });

  it('debe mostrar las etiquetas del issue', () => {
    const labels = fixture.debugElement.queryAll(By.css('.badge'));
    expect(labels.length).toBe(mockIssue.labels.length);
    expect(labels[0].nativeElement.textContent.trim()).toBe(mockIssue.labels[0].name);
  });

  it('debe tener la estructura de bootstrap correcta', () => {
    expect(fixture.debugElement.query(By.css('.card'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.card-body'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.card-title'))).toBeTruthy();
  });
});