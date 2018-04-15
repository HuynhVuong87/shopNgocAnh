import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { fuseAnimations } from '@fuse/animations';

import { Order, Invoice } from './order.model';
import { EcommerceOrderService } from './order.service';
import { orderStatuses } from './order-statuses';
import { Observable } from '@firebase/util';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'fuse-e-commerce-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class FuseEcommerceOrderComponent implements OnInit, OnDestroy {
    order = new Order();
    invoices: any[];
    onOrderChanged: Subscription;
    onInvoiceChanged: Subscription;
    statusForm: FormGroup;
    orderForm: FormGroup;
    invoiceForm: FormGroup[];
    orderStatuses = orderStatuses;
    pageType: string;
    filteredDistrict: Observable<any[]>;
    filteredProducts = [];

    constructor(
        private orderService: EcommerceOrderService,
        private formBuilder: FormBuilder) { }

    filterStates(name: string, states) {
        return states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    }

    ngOnInit() {
        // Subscribe to update order on changes
        this.onOrderChanged =
            this.orderService.onOrderChanged
                .subscribe(order => {

                    if (order) {
                        this.order = new Order(order);
                        this.pageType = 'edit';
                    }
                    else {
                        this.pageType = 'new';
                        this.order = new Order();
                    }

                    this.orderForm = this.createOrderForm();
                });

        this.onInvoiceChanged =
            this.orderService.onInvoiceChanged
                .subscribe(invoices => {
                    if (invoices) {
                        this.invoices = [];
                        this.invoices = invoices;
                    }
                    else {
                        this.invoices = [];
                        this.invoices.push(new Invoice());
                    }
                    this.invoiceForm = [];
                    if (this.invoices.length > 0) {
                        this.invoices.map(inv => {
                            const form: FormGroup = this.createInvoiceForm(inv);
                            this.invoiceForm.push(form);
                        });
                        this.orderService.afs.collection<any>('product').valueChanges().subscribe(data => {
                            this.filteredProducts = [];
                            data.map(pro => {
                                pro.instock = 0;
                                this.orderService.afs.collection<any>('invoiceBuy', ref => ref.where('productId', '==', pro.id)).valueChanges().subscribe(invs => invs.map(inv => {
                                    pro.instock += inv.instock;
                                    this.invoiceForm.map(form => {
                                        this.filteredProducts.push(form.get('productname').valueChanges
                                            .pipe(
                                                startWith(''),
                                                map(state => state ? this.filterStates(state, data) : data.slice())
                                            ));
                                    });
                                }));
                            });
                        });
                    }
                });

        this.statusForm = this.formBuilder.group({
            newStatus: ['']
        });
    }

    onChange(i) {
        const value = this.invoiceForm[i].get('price').value * this.invoiceForm[i].get('quantity').value;
        this.invoiceForm[i].patchValue({
            total: value,
        });
    }

    createOrderForm() {
        return this.formBuilder.group({
            id: [this.order.id],
            name: [this.order.name],
            phone: [this.order.phone],
            // email: [this.order.email],
            city: [this.order.city],
            district: [this.order.district],
            address: [this.order.address],
            orderdate: [this.order.orderdate],
            invoicesellid: [this.order.invoicesellid],
            airwaybill: [this.order.airwaybill],
            shipfee: [this.order.shipfee],
            source: [this.order.source],
            sourceorderid: [this.order.sourceorderid],
        });
    }

    createInvoiceForm(invoice) {
        return this.formBuilder.group({
            price: [invoice.price],
            invoicebuyid: [invoice.invoicebuyid],
            productname: [invoice.productname],
            productid: [invoice.productid],
            quantity: [invoice.quantity],
            total: [invoice.total]
        });
    }

    getTotal() {
        let total = 0;
        this.invoiceForm.map(form => {
            total += form.get('quantity').value * form.get('price').value;
        });
        return total;
    }

    newInvoice() {
        this.invoices.push(new Invoice());
        const form: FormGroup = this.createInvoiceForm(this.invoices[this.invoices.length - 1]);
        this.invoiceForm.push(form);
        this.orderService.afs.collection<any>('product').valueChanges().subscribe(data => {
            this.filteredProducts.push(this.invoiceForm[this.invoiceForm.length - 1].get('productname').valueChanges.pipe(
                startWith(''),
                map(state => state ? this.filterStates(state, data) : data.slice())
            ));
        });
    }

    delInvoice(i) {
        if (this.invoices[i].id) {
            const alert = confirm('DELETE?');
            if (alert === true) {
                this.invoices.splice(this.invoices.indexOf(this.invoices[i]), 1);
                this.invoiceForm.splice(this.invoiceForm.indexOf(this.invoiceForm[i]), 1);
                this.filteredProducts.splice(this.filteredProducts.indexOf(this.filteredProducts[i]), 1);
                //         // this.BuyService.afs.doc(`invoiceBuy/${inv.id}`).delete();
                //         // this.saveBuy();
            }
        } else {
            this.invoices.splice(this.invoices.indexOf(this.invoices[i]), 1);
            this.invoiceForm.splice(this.invoiceForm.indexOf(this.invoiceForm[i]), 1);
            this.filteredProducts.splice(this.filteredProducts.indexOf(this.filteredProducts[i]), 1);
        }
    }

    invocieFormInvalid() {
        let invalid = false;
        for (let i = 0; i < this.invoiceForm.length; i++) {
            if (this.invoiceForm[i].invalid || this.invoiceForm[i].get('price').value <= 0 || this.invoiceForm[i].get('quantity').value <= 0) {
                invalid = true;
                break;
            } else {
                invalid = false;
            }
        }
        return invalid;
    }

    ngOnDestroy() {
        this.onOrderChanged.unsubscribe();
    }

    addOrder() {
        const dataOrder = this.orderForm.getRawValue();
        const dataInvoices = [];
        this.invoiceForm.map(form =>
            dataInvoices.push(form.getRawValue())
        );
        this.orderService.addOrder(dataOrder, dataInvoices);
    }

    // updateStatus()
    // {
    //     const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);

    //     if ( !newStatusId )
    //     {
    //         return;
    //     }

    //     const newStatus = this.orderStatuses.find((status) => {
    //         return status.id === newStatusId;
    //     });

    //     newStatus['date'] = new Date().toString();

    //     this.order.status.unshift(newStatus);
    // }
}
