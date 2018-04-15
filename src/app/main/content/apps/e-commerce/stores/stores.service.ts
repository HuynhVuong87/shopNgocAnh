import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


@Injectable()
export class EcommerceStoresService implements Resolve<any>
{
    stores: any[];
    onStoresChanged: BehaviorSubject<any> = new BehaviorSubject({});

    storeCollection: AngularFirestoreCollection<any>;

    constructor(private http: HttpClient, public afs: AngularFirestore){
        this.storeCollection = this.afs.collection('store', ref => ref.orderBy('name'));
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getStores()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getStores(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.storeCollection.snapshotChanges()
                .subscribe((response: any) => {
                    this.stores = response;
                    this.onStoresChanged.next(this.stores);
                    resolve(response);
                }, reject);
        });
    }
}
