import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { InvoiceBuy, OrderBuy } from './buy.model';
import { EcommerceBuyService } from './buy.service';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { cities, City, District } from 'app/address/address';

@Component({
    selector: 'fuse-e-commerce-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FuseEcommerceBuyComponent implements OnInit, OnDestroy {

    orderbuy: any;
    invoicebuys: any = [];
    onOrderBuyChanged: Subscription;
    onInvoiceBuyChanged: Subscription;
    pageType: string;
    orderBuyForm: FormGroup;
    invoiceBuyForm: FormGroup[] = [];
    filteredStores: Observable<any[]>;
    filteredProducts = [];
    filteredSku = [];
    proId = [];

    constructor(
        private BuyService: EcommerceBuyService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location, private route: ActivatedRoute
    ) { }

    filterStates(name: string, states) {
        return states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    }

    ngOnInit() {
        this.onOrderBuyChanged =
            this.BuyService.onOrderBuyChanged
                .subscribe(orderBuy => {

                    if (orderBuy) {
                        this.orderbuy = orderBuy;
                        this.pageType = 'edit';
                    }
                    else {
                        this.pageType = 'new';
                        this.orderbuy = new OrderBuy();
                    }
                    this.orderBuyForm = this.createOrderBuyForm();
                });
        this.onInvoiceBuyChanged =
            this.BuyService.onInvoiceBuyChanged
                .subscribe(invoiceBuy => {
                    if (invoiceBuy) {
                        this.invoicebuys = invoiceBuy;
                    }
                    else {
                        this.invoicebuys.push(new InvoiceBuy());
                    }
                    if (this.invoicebuys.length >= 0) {
                        this.invoicebuys.map(invoicebuy => {
                            const form: FormGroup = this.createInvoiceBuyForm(invoicebuy);
                            this.invoiceBuyForm.push(form);
                        });
                        // this.BuyService.afs.collection<any>('products').valueChanges().subscribe(data => {
                        //     this.filteredProducts = [];
                        //     this.invoiceBuyForm.map(form => {
                        //         this.filteredProducts.push(form.get('productName').valueChanges
                        //             .pipe(
                        //                 startWith(''),
                        //                 map(state => state ? this.filterStates(state, data) : data.slice())
                        //             ));
                        //     });
                        // });
                    }

                });
        this.BuyService.afs.collection<any>('store').valueChanges().subscribe(data => {
            this.filteredStores = this.orderBuyForm.get('storename').valueChanges
                .pipe(
                    startWith(''),
                    map(state => state ? this.filterStates(state, data) : data.slice())
                );
        });

    }
    ngOnDestroy() {
        this.onOrderBuyChanged.unsubscribe();
    }

    newInvoiceBuy() {
        this.invoicebuys.push(new InvoiceBuy());
        const form: FormGroup = this.createInvoiceBuyForm(this.invoicebuys[this.invoicebuys.length - 1]);
        this.invoiceBuyForm.push(form);
    }

    delInvoiceBuy(inv, form, fil) {
        if (inv.id) {
            const alert = confirm('DELETE?');
            if (alert === true) {
                this.invoicebuys.splice(this.invoicebuys.indexOf(inv), 1);
                this.invoiceBuyForm.splice(this.invoiceBuyForm.indexOf(form), 1);
                this.BuyService.afs.doc(`invoiceBuy/${inv.id}`).delete();
                this.saveBuy();
            }
        } else {
            this.invoicebuys.splice(this.invoicebuys.indexOf(inv), 1);
            this.invoiceBuyForm.splice(this.invoiceBuyForm.indexOf(form), 1);
            this.filteredProducts.splice(this.filteredProducts.indexOf(fil), 1);
        }
    }

    createOrderBuyForm() {
        return this.formBuilder.group({
            id: [this.orderbuy.id],
            storeid: [this.orderbuy.storeid],
            storename: [this.orderbuy.storename],
            orderdate: [this.orderbuy.orderdate],
            invoicebuyid: [this.orderbuy.invoiceid],
            airwaybill: [this.orderbuy.airwaybill],
            chinaarrivaldate: [this.orderbuy.chinaarrivaldate],
            vietnamarrivaldate: [this.orderbuy.vietnamarrivaldate],
            sourceorderid: [this.orderbuy.sourceorderid],
            weight: [this.orderbuy.weight],
            ispaid: [this.orderbuy.ispaid],
            isreceived: [this.orderbuy.isreceived],
            chinafreight: [this.orderbuy.chinafreight],
            chinavietnamfreight: [this.orderbuy.chinavietnamfreight],
            vietnamfreight: [this.orderbuy.vietnamfreight],
            rate: [this.orderbuy.rate],
            note: [this.orderbuy.note],
        });
    }
    createInvoiceBuyForm(invoicebuy) {
        return this.formBuilder.group({
            id: [invoicebuy.id],
            price: [invoicebuy.price],
            productId: [invoicebuy.productId],
            Name: [invoicebuy.Name],
            quantity: [invoicebuy.quantity],
            instock: [invoicebuy.instock],
            skuName: [invoicebuy.skuName]
        });
    }

    saveBuy() {
        const dataOrderBuy = this.orderBuyForm.getRawValue();
        const dataInvoiceBuys: any[] = [];
        this.invoiceBuyForm.map(form => {
            dataInvoiceBuys.push(form.getRawValue());
        });
        this.BuyService.saveBuy(dataOrderBuy, dataInvoiceBuys);
    }

    deleteBuy() {
        const alert = confirm('DELETE THIS STORE?');
        if (alert === true) {
            const dataOrderBuy = this.orderBuyForm.getRawValue();
            const dataInvoiceBuys: any[] = [];
            this.invoiceBuyForm.map(form => {
                dataInvoiceBuys.push(form.getRawValue());
            });
            this.BuyService.deleteBuy(dataOrderBuy, dataInvoiceBuys);
        }
    }

    addBuys() {
        const dataOrderBuy = this.orderBuyForm.getRawValue();
        const dataInvoiceBuys = [];
        this.invoiceBuyForm.map(form =>
            dataInvoiceBuys.push(form.getRawValue())
        );
        // console.log(dataInvoiceBuys);
        this.BuyService.addBuy(dataOrderBuy, dataInvoiceBuys);
    }
}
