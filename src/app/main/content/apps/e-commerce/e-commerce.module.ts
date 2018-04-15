import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, MatButtonModule, MatChipsModule, MatCheckboxModule } from '@angular/material';
import { MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatAutocompleteModule, MatDatepickerModule } from '@angular/material';
import { AuthGuard } from '../../../../core/auth.guard';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImageUploadService } from './upload.service';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { FuseEcommerceDashboardComponent } from './dashboard/dashboard.component';
import { EcommerceDashboardService } from './dashboard/dashboard.service';
import { FuseEcommerceProductsComponent } from './products/products.component';
import { EcommerceProductsService } from './products/products.service';
import { FuseEcommerceProductComponent } from './product/product.component';
import { EcommerceProductService } from './product/product.service';
import { FuseEcommerceOrdersComponent } from './orders/orders.component';
import { EcommerceOrdersService } from './orders/orders.service';
import { FuseEcommerceOrderComponent } from './order/order.component';
import { EcommerceOrderService } from './order/order.service';
import { StoresComponent } from './stores/stores.component';
import { StoreComponent } from './store/store.component';
import { EcommerceStoreService } from './store/store.service';
import { EcommerceStoresService } from './stores/stores.service';
import { FuseEcommerceCourierComponent } from './courier/courier.component';
import { FuseEcommerceCouriersComponent } from './couriers/couriers.component';
import { EcommerceCouriersService } from './couriers/couriers.service';
import { EcommerceCourierService } from './courier/courier.service';
import { FuseEcommerceOrderBuyComponent } from './buys/order-buy.component';
import { FuseEcommerceBuyComponent } from './buy/buy.component';
import { EcommerceBuyService } from './buy/buy.service';
import { CityDirective, DistrictDirective } from './address.directive';
import { ProductDirective, SkuDirective } from './product.directive';

const routes: Routes = [
    {
        path     : 'dashboard',
        component: FuseEcommerceDashboardComponent,

        resolve  : {
            data: EcommerceDashboardService
        }
    },
    {
        path     : 'products',
        component: FuseEcommerceProductsComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceProductsService
        }
    },
    {
        path     : 'products/:id',
        component: FuseEcommerceProductComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'products/:id/:name',
        component: FuseEcommerceProductComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceProductService,
        }
    },
    {
        path     : 'stores',
        component: StoresComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceStoresService
        }
    },
    {
        path     : 'stores/:id',
        component: StoreComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceStoreService
        }
    },
    {
        path     : 'stores/:id/:name',
        component: StoreComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceStoreService,
        }
    },
    {
        path     : 'couriers',
        component: FuseEcommerceCouriersComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceCouriersService
        }
    },
    {
        path     : 'couriers/:id',
        component: FuseEcommerceCourierComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceCourierService
        }
    },
    {
        path     : 'couriers/:id/:name',
        component: FuseEcommerceCourierComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceCourierService,
        }
    },
    {
        path     : 'buys',
        component: FuseEcommerceOrderBuyComponent,
        canActivate: [AuthGuard],
        // resolve  : {
        //     data: EcommerceOrderBuyService
        // }
    },
    {
        path     : 'buys/:id',
        component: FuseEcommerceBuyComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceBuyService
        }
    },
    {
        path     : 'buys/:id/:name',
        component: FuseEcommerceBuyComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceBuyService,
        }
    },
    {
        path     : 'orders',
        component: FuseEcommerceOrdersComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'orders/:id',
        component: FuseEcommerceOrderComponent,
        canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceOrderService
        }
    }
];

@NgModule({
    declarations: [
        FuseEcommerceDashboardComponent,
        FuseEcommerceProductsComponent,
        FuseEcommerceProductComponent,
        FuseEcommerceOrdersComponent,
        FuseEcommerceOrderComponent,
        StoresComponent,
        StoreComponent,
        FuseEcommerceCourierComponent,
        FuseEcommerceCouriersComponent,
        FuseEcommerceOrderBuyComponent,
        FuseEcommerceBuyComponent,
        CityDirective,
        DistrictDirective,
        ProductDirective,
        SkuDirective
    ],
    imports     : [
        RouterModule.forChild(routes),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        CdkTableModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatCheckboxModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers   : [
        AuthGuard,
        EcommerceDashboardService,
        EcommerceProductsService,
        EcommerceProductService,
        EcommerceOrdersService,
        EcommerceOrderService,
        ImageUploadService,
        EcommerceStoreService,
        EcommerceStoresService,
        EcommerceCouriersService,
        EcommerceCourierService,
        EcommerceBuyService
    ],
})
export class FuseEcommerceModule
{
}
