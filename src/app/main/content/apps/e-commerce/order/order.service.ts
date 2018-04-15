import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Injectable()
export class EcommerceOrderService implements Resolve<any>
{
    routeParams: any;
    order: any;
    invoice: any[];
    onOrderChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onInvoiceChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient,
        public afs: AngularFirestore,
        public snackBar: MatSnackBar,
        private location: Location
    ) { }

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
                this.getOrder()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getOrder(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onOrderChanged.next(false);
                this.onInvoiceChanged.next(false);
                resolve(false);
            }
            else {
                this.afs.collection<any>('orderSell', ref => {
                    return ref.where('id', '==', this.routeParams.id);
                }).valueChanges().subscribe(data => {
                    this.order = data[0];
                    this.onOrderChanged.next(this.order);
                    resolve(data);
                    data.map(a => {
                        this.invoice = [];
                        a.invoicesellid.map(id => {
                            this.afs.collection<any>('invoiceSell', ref =>
                                ref.where('id', '==', id)).valueChanges().subscribe(_data => _data.map(invoice => {
                                    invoice.total = invoice.quantity * invoice.price;
                                    this.afs.collection<any>('invoiceBuy', ref => ref.where('id', '==', invoice.invoicebuyid[0].id)).valueChanges().subscribe(invbuy =>
                                        invbuy.map(p => {
                                            this.afs.collection<any>('product', ref => ref.where('id', '==', p.productId)).valueChanges().subscribe(pro =>
                                                pro.map(pr => {
                                                    invoice.image = pr.images[0].url;
                                                    invoice.productname = pr.name;
                                                    this.invoice.push(invoice);
                                                    this.onInvoiceChanged.next(this.invoice);
                                                })
                                            );
                                        }));
                                }));
                        });
                        resolve();
                    });
                });
            }
        });
    }

    saveOrder(order) {
        return new Promise((resolve, reject) => {
            this.http.post('api/e-commerce-orders/' + order.id, order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addOrder(order, invoices) {
        order.invoicesellid = [];
        order.id = this.afs.createId();
        const obfail = [];
        Promise.all(invoices.map(invoice => {
            return new Promise((resolve1, reject1) => {
                invoice.invoicebuyid = [];
                invoice.id = this.afs.createId();
                order.invoicesellid.push(invoice.id);
                let quantity = invoice.quantity;
                this.afs.collection<any>('product', ref => ref.where('name', '==', invoice.productname)).valueChanges().subscribe(a => a.map(data => {
                    invoice.productid = data.id;
                    this.afs.collection<any>('invoiceBuy', ref => ref.where('productId', '==', data.id)).valueChanges().subscribe(invb => {
                        invb.sort((b: any, c: any) => {
                            if (b.instock < c.instock) { return -1; }
                            else if (b.instock > c.instock) { return 1; }
                            else { return 0; }
                        }).map(invbuy => {
                            if (quantity > 0 && invbuy.instock > 0) {
                                if (quantity <= invbuy.instock) {
                                    const invbid = {
                                        id: invbuy.id,
                                        quantity: quantity
                                    };
                                    invoice.invoicebuyid.push(invbid);
                                    quantity = 0;
                                }
                                if (quantity > invbuy.instock) {
                                    const invbid = {
                                        id: invbuy.id,
                                        quantity: invbuy.instock
                                    };
                                    invoice.invoicebuyid.push(invbid);
                                    quantity -= invbuy.instock;
                                }
                            }
                        });
                        if (quantity > 0) {
                            console.log('không đủ hàng');
                            const fail = { quantity: quantity, name: invoice.productname };
                            obfail.push(fail);
                        }
                        resolve1();
                    });
                }));
            });
        })).then((data) => {
            if (obfail.length > 0) {
                alert(obfail);
            } else {
                Promise.all(invoices.map(inv => {
                    return new Promise(re => {
                        Promise.all(inv.invoicebuyid.map(id => {
                            return new Promise(reinb => {
                                this.afs.doc<any>(`invoiceBuy/${id.id}`).valueChanges().subscribe(da => {
                                    da.instock -= id.quantity;
                                    reinb(da);
                                });
                            }).then((da) => {
                                this.afs.doc(`invoiceBuy/${id.id}`).update(da);
                            });
                        })).then(() => {
                            const temp = inv;
                            delete temp.total;
                            delete temp.productname;
                            delete temp.productid;
                            this.afs.collection('invoiceSell').doc(temp.id).set(temp).then(() => re());
                        });

                    });
                })).then((dat) => {
                    this.afs.doc(`orderSell/${order.id}`).set(order).then(() => {
                        console.log('complete');

                        this.onOrderChanged.next(order);
                        this.snackBar.open('Buy added', 'OK', {
                            verticalPosition: 'top',
                            duration: 2000
                        });

                        // Change the location with new one
                        this.location.go('apps/e-commerce/orders/' + order.id);
                    });
                });
            }
        });
    }
}
