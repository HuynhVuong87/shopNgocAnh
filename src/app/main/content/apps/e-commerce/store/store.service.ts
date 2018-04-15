import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from 'app/main/content/apps/e-commerce/store/store.model';

@Injectable()
export class EcommerceStoreService implements Resolve<any>
{

    routeParams: any;
    store = new Store();
    onStoreChanged: BehaviorSubject<any> = new BehaviorSubject({});

    storeCollection: AngularFirestoreCollection<Store>;
    storeDoc: AngularFirestoreDocument<Store>;

    constructor(private http: HttpClient, public afs: AngularFirestore) {

        this.storeCollection = this.afs.collection<any>('store');
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
                this.getStore()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getStore(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onStoreChanged.next(false);
                resolve(false);
            }
            else {
                this.afs.collection<any>('store', ref => {
                    return ref.where('id', '==', this.routeParams.id);
                }).valueChanges().subscribe(data => {
                    this.store = data[0] as Store;
                    this.onStoreChanged.next(this.store);
                    resolve(this.store);
                });
            }
        });
    }

    saveStore(store) {
        store.id = this.routeParams.id;
        this.storeDoc = this.afs.doc(`store/${this.routeParams.id}`);
        return this.storeDoc.update(store);
    }

    deleteStore(store) {
        this.storeDoc = this.afs.doc(`store/${store.id}`);
        return this.storeDoc.delete();
    }
    addStore(store) {
        const id = this.afs.createId();
        store.id = id;
        return this.storeCollection.doc(id).set(store);
    }

}
