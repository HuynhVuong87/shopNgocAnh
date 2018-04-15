import { FuseUtils } from '@fuse/utils';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

export class InvoiceBuy {

    id: string;
    productId: string;
    quantity: number;
    price: number;
    instock: number;
    skuName: string;

    constructor(invoicebuy?) {
        invoicebuy = invoicebuy || {};
        this.id = invoicebuy.id || '';
        this.productId = invoicebuy.productId || '';
        this.quantity = invoicebuy.quantity || 0;
        this.price = invoicebuy.price || 0;
        this.instock = invoicebuy.instock || 0;
        this.skuName = invoicebuy.skuName || 0;
    }

}
export class OrderBuy {

    id: string;
    orderdate: Date;
    invoicebuyid: string[];
    storeid: string;
    airwaybill: string;
    chinaarrivaldate: Date;
    vietnamarrivaldate: Date;
    sourceorderid: string;
    weight: number;
    ispaid: boolean;
    isreceived: boolean;
    chinafreight: number;
    chinavietnamfreight: number;
    vietnamfreight: number;
    rate: number;
    note: string;

    constructor(orderbuy?) {
        orderbuy = orderbuy || {};
        this.id = orderbuy.id || '';
        this.orderdate = orderbuy.orderdate || '';
        this.invoicebuyid = orderbuy.invoicebuyid || [];
        this.storeid = orderbuy.storeid || '';
        this.airwaybill = orderbuy.airwaybill || '';
        this.chinaarrivaldate = orderbuy.chinaarrivaldate || '';
        this.vietnamarrivaldate = orderbuy.vietnamarrivaldate || '';
        this.sourceorderid = orderbuy.sourceorderid || '';
        this.weight = orderbuy.weight || 0;
        this.ispaid = orderbuy.ispaid || false;
        this.isreceived = orderbuy.isreceived || false;
        this.chinafreight = orderbuy.chinafreight || 0;
        this.chinavietnamfreight = orderbuy.chinavietnamfreight || 0;
        this.vietnamfreight = orderbuy.vietnamfreight || 0;
        this.rate = orderbuy.rate || 0;
        this.note = orderbuy.note || '';
    }
}
