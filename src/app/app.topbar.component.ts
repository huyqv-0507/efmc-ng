import {Component, OnDestroy} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnDestroy {

    subscription: Subscription;

    items: MenuItem[];
    isVietNamese: boolean = true;

    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        private translate: TranslateService
    ) {
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    handleSwitchLanguage(checked: boolean): void {
        let language;
        switch (checked) {
            case true:
                language = 'vi'
                break;
            case false:
                language = 'en'
                break;
        }
        this.translate.use(language)
    }
}
