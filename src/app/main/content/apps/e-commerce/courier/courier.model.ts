import { FuseUtils } from '@fuse/utils';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

export class Courier {

    id: string;
    name: string;
    email: string;
    phone: number;
    city: string;
    district: string;
    address: string;
    shipIdFormat: string;
    trackingUrlFormat: string;

    constructor(courier?) {
        courier = courier || {};
        this.id = courier.id || '';
        this.name = courier.name || '';
        this.email = courier.email || '';
        this.phone = courier.phone || '';
        this.city = courier.city || '';
        this.district = courier.district || '';
        this.address = courier.address || '';
        this.shipIdFormat = courier.shipIdFormat || 0;
        this.trackingUrlFormat = courier.trackingUrlFormat || 0;
    }

}
