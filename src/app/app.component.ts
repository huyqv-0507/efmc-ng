import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';

    inputStyle = 'outlined';

    ripple: boolean;

    darkMode: boolean = false;

    lightMode: boolean = true;

    theme = 'light';

    constructor(private primengConfig: PrimeNGConfig,
                private translate: TranslateService) {
        translate.setDefaultLang('vi');
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
}
