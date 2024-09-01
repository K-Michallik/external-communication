import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApplicationPresenterAPI, ApplicationPresenter, RobotSettings } from '@universal-robots/contribution-api';
import { ExternalCommunicatorNode } from './external-communicator.node';
import { BackendService } from './backend.service';
import { URCAP_ID, VENDOR_ID } from 'src/generated/contribution-constants';

@Component({
    templateUrl: './external-communicator.component.html',
    styleUrls: ['./external-communicator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalCommunicatorComponent implements ApplicationPresenter, OnChanges {
    // applicationAPI is optional
    @Input() applicationAPI: ApplicationPresenterAPI;
    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // applicationNode is required
    @Input() applicationNode: ExternalCommunicatorNode;
    private beService: BackendService = inject(BackendService);
    readonly echoResponse$ = this.beService.echo$;

    private backendHttpUrl: string;

    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (changes.applicationAPI?.currentValue && changes.applicationAPI.firstChange) {
                this.backendHttpUrl = this.applicationAPI.getContainerContributionURL(VENDOR_ID, URCAP_ID, 'external-communication-backend', 'rest-api');
                console.log(this.backendHttpUrl);
            }

            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
    }

    onButtonPress(): void {
        const externalIp = '127.0.0.1'
        const externalPort = '50051'
        const externalMessage = "Hello World"
        this.beService.echoServer(this.backendHttpUrl, externalIp, externalPort, externalMessage);
    }


    // call saveNode to save node parameters
    saveNode() {
        this.cd.detectChanges();
        this.applicationAPI.applicationNodeService.updateNode(this.applicationNode);
    }
}
