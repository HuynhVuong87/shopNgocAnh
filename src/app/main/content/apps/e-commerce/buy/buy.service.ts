import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrderBuy, InvoiceBuy } from './buy.model';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Injectable()
export class EcommerceBuyService implements Resolve<any>
{

    routeParams: any;
    orderbuy = new OrderBuy();
    invoicebuys: any;
    onOrderBuyChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onInvoiceBuyChanged: BehaviorSubject<any> = new BehaviorSubject({});

    // orderBuyCollection: AngularFirestoreCollection<OrderBuy>;
    // orderBuyDoc: AngularFirestoreDocument<OrderBuy>;

    constructor(private http: HttpClient, public afs: AngularFirestore,
        public snackBar: MatSnackBar,
        private location: Location) {

        // this.orderBuyCollection = this.afs.collection<any>('orderBuy');
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOrderBuy()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getStores() {
        let stores: any;
        this.afs.collection('store').valueChanges().subscribe(data => {
            stores = data;
            return stores;
        });
    }

    getOrderBuy(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onOrderBuyChanged.next(false);
                this.onInvoiceBuyChanged.next(false);
                resolve(false);
            }
            else {
                this.afs.doc<any>(`orderBuy/${this.routeParams.id}`).valueChanges().subscribe(order => {
                    new Promise((resoleveO, rejectO) => {
                        this.afs.doc<any>(`store/${order.storeid}`).valueChanges().subscribe(store => {
                            order.storename = store.name;
                            this.orderbuy = order as OrderBuy;
                            resoleveO();
                        });
                    }).then(() => {
                        this.invoicebuys = [];
                        Promise.all(order.invoicebuyid.map(id => {
                            return new Promise((resolve1, reject1) => {
                                this.afs.doc<any>(`invoiceBuy/${id}`).valueChanges().subscribe(invoiceBuy => {
                                    this.afs.doc<any>(`products/${invoiceBuy.productId}`).valueChanges().subscribe(p => {
                                        invoiceBuy.Name = p.name;
                                        this.afs.doc<any>(`products/${invoiceBuy.productId}/sku/${invoiceBuy.skuName}`).valueChanges().subscribe(sku => {
                                            invoiceBuy.skuImage = sku.skuUrl_Image;
                                            this.invoicebuys.push(invoiceBuy as InvoiceBuy);
                                            resolve1();
                                        });
                                    });
                                });
                            });
                        })).then(() => {
                            this.onOrderBuyChanged.next(this.orderbuy);
                            this.onInvoiceBuyChanged.next(this.invoicebuys);
                        });
                    });
                    resolve();
                });
            }
        });
    }

    saveBuy(orderBuy, invoiceBuys) {

        const saveInvoice = function () {

        };
        orderBuy.invoicebuyid = [];
        // this.invoicebuys = [];
        invoiceBuys.map(inv => {
            this.afs.collection<any>('product', ref => ref.where('name', '==', inv.productName)).valueChanges().subscribe(a => a.map(data => {
                inv.productId = data.id;
                if (inv.id === '') {
                    inv.id = this.afs.createId();
                    const invoice = inv;
                    inv.instock = inv.quantity;
                    delete invoice.productName;
                    this.afs.doc(`invoiceBuy/${invoice.id}`).set(invoice);
                } else {
                    const invoice = inv;
                    delete invoice.productName;
                    this.afs.doc(`invoiceBuy/${invoice.id}`).update(invoice);
                }

                orderBuy.invoicebuyid.push(inv.id);
                // this.invoicebuys.push(inv);
            }));
        });

        this.afs.collection<any>('store', ref => ref.where('name', '==', orderBuy.storename)).valueChanges().subscribe(a => a.map(data => {
            orderBuy.storeid = data.id;
            const orderbuy = orderBuy;
            delete orderbuy.storename;
            this.afs.doc(`orderBuy/${orderbuy.id}`).update(orderbuy).then(() => {
                console.log(invoiceBuys);
                this.snackBar.open('Buy saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
        }));
        this.onInvoiceBuyChanged.next(invoiceBuys);
        this.onOrderBuyChanged.next(orderBuy);

    }

    deleteBuy(orderBuy, invoiceBuys) {
        this.afs.doc(`orderBuy/${orderBuy.id}`).delete().then(() => {
            invoiceBuys.map(inv =>
                this.afs.doc(`invoiceBuy/${inv.id}`).delete()
            );
            this.onOrderBuyChanged.next(false);
            this.onInvoiceBuyChanged.next(false);
            this.snackBar.open('Buy deleted', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            this.location.go('apps/e-commerce/buys/new');
        });
    }

    addBuy(orderBuy, invoiceBuys) {

        orderBuy.invoicebuyid = [];
        orderBuy.id = this.afs.createId();
        invoiceBuys.map(invoicebuy => {
            invoicebuy.id = this.afs.createId();
            orderBuy.invoicebuyid.push(invoicebuy.id);
        });
        this.afs.collection<any>('store', ref => ref.where('name', '==', orderBuy.storename)).valueChanges().subscribe(a => a.map(data => {
            orderBuy.storeid = data.id;
            this.onOrderBuyChanged.next(orderBuy);
            delete orderBuy.storename;
            const orderbuy = orderBuy;
            this.afs.collection('orderBuy').doc(orderbuy.id).set(orderbuy);
        }));

        invoiceBuys.map(invoiceBuy => {
            invoiceBuy.instock = invoiceBuy.quantity;
            this.afs.collection<any>('product', ref => ref.where('name', '==', invoiceBuy.productName)).valueChanges().subscribe(a => a.map(data => {
                invoiceBuy.productId = data.id;
                // this.onInvoiceBuyChanged.next(invoiceBuys);
                delete invoiceBuy.productName;
                // const invoicebuy = invoiceBuys;
                this.afs.collection<any>('invoiceBuy').doc(invoiceBuy.id).set(invoiceBuy);

                this.snackBar.open('Buy added', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                // Change the location with new one
                this.location.go('apps/e-commerce/buys/' + orderBuy.id);
            }));
        });
    }

}
