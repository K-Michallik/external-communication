import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ExternalCommunicatorComponent} from "./external-communicator.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('ExternalCommunicatorComponent', () => {
  let fixture: ComponentFixture<ExternalCommunicatorComponent>;
  let component: ExternalCommunicatorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalCommunicatorComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalCommunicatorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
