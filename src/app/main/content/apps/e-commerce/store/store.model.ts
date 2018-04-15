import { FuseUtils } from '@fuse/utils';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

export class Store {

    id: string;
    name: string;
    email: string;
    keeper: string;
    phone: number;
    city: string;
    district: string;
    address: string;

    constructor(store?) {
        store = store || {};
        this.id = store.id || '';
        this.name = store.name || '';
        this.email = store.email || '';
        this.keeper = store.keeper || '';
        this.phone = store.phone || '';
        this.city = store.city || '';
        this.district = store.district || '';
        this.address = store.address || '';
    }

}
