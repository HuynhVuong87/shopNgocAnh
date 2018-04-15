import { FuseUtils } from '@fuse/utils';

export class Order
{
    id: string;
    name: string;
    phone: number;
    // email: string;
    city: string;
    district: string;
    address: string;
    orderdate: Date;
    invoicesellid: string[];
    airwaybill: string;
    shipfee: number;
    source: string;
    sourceorderid: string;

    constructor(order?)
    {
        order = order || {};
        this.id = order.id || '';
        this.name = order.name || '';
        this.phone = order.phone || '';
        // this.email = order.email || '';
        this.city = order.city || '';
        this.district = order.district || '';
        this.address = order.address || '';
        this.orderdate = order.orderdate || '';
        this.invoicesellid = order.invoicesellid || [];
        this.airwaybill = order.airwaybill || '';
        this.shipfee = order.shipfee || 0;
        this.source = order.source || '';
        this.sourceorderid = order.sourceorderid || '';
    }
}

export class Invoice {
    id: string;
    invoicebuyid: {
        id: string,
        quantity: number
    }[];
    price: number;
    quantity: number;

    constructor(invoice?){
        invoice = invoice || {};
        this.id = invoice.id || '';
        this.invoicebuyid = invoice.invociebuyid || [];
        this.price = invoice.price || 0;
        this.quantity = invoice.quantity || 0;
    }
}
