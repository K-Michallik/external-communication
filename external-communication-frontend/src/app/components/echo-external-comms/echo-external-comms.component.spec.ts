import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EchoExternalCommsComponent} from "./echo-external-comms.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('EchoExternalCommsComponent', () => {
  let fixture: ComponentFixture<EchoExternalCommsComponent>;
  let component: EchoExternalCommsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchoExternalCommsComponent],
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

    fixture = TestBed.createComponent(EchoExternalCommsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
