import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { EchoExternalCommsComponent } from './components/echo-external-comms/echo-external-comms.component';
import { ExternalCommunicatorComponent } from './components/external-communicator/external-communicator.component';
import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
        { prefix: PATH + '/assets/i18n/', suffix: '.json' },
        { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

@NgModule({
    declarations: [
        EchoExternalCommsComponent,
        ExternalCommunicatorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UIAngularComponentsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend] },
            useDefaultLang: false,
        })
    ],
    providers: [],
})

export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const echoexternalcommsComponent = createCustomElement(EchoExternalCommsComponent, {injector: this.injector});
        customElements.define('urcaps-r-us-external-communication-frontend-echo-external-comms', echoexternalcommsComponent);
        const externalcommunicatorComponent = createCustomElement(ExternalCommunicatorComponent, {injector: this.injector});
        customElements.define('urcaps-r-us-external-communication-frontend-external-communicator', externalcommunicatorComponent);
    }

    // This function is never called, because we don't want to actually use the workers, just tell webpack about them
    registerWorkersWithWebPack() {
        new Worker(new URL('./components/external-communicator/external-communicator.behavior.worker.ts'
            /* webpackChunkName: "external-communicator.worker" */, import.meta.url), {
            name: 'external-communicator',
            type: 'module'
        });
        new Worker(new URL('./components/echo-external-comms/echo-external-comms.behavior.worker.ts'
            /* webpackChunkName: "echo-external-comms.worker" */, import.meta.url), {
            name: 'echo-external-comms',
            type: 'module'
        });
    }
}

