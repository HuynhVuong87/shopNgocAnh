import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CoreModule } from './core/core.module';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseFakeDbService } from './fuse-fake-db/fuse-fake-db.service';
import { FuseMainModule } from './main/main.module';
import { AppStoreModule } from './store/store.module';

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: './main/content/apps/apps.module#FuseAppsModule',
    },
    {
        path        : 'pages',
        loadChildren: './main/content/pages/pages.module#FusePagesModule'
    },
    {
        path        : 'ui',
        loadChildren: './main/content/ui/ui.module#FuseUIModule'
    },
    {
        path        : 'services',
        loadChildren: './main/content/services/services.module#FuseServicesModule'
    },
    {
        path        : 'components',
        loadChildren: './main/content/components/components.module#FuseComponentsModule',
    },
    {
        path        : 'components-third-party',
        loadChildren: './main/content/components-third-party/components-third-party.module#FuseComponentsThirdPartyModule'
    },
    {
        path      : '**',
        redirectTo: 'apps/e-commerce/dashboard',

    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FuseFakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,

        AppStoreModule,
        FuseMainModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        CoreModule
    ]
    ,
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
