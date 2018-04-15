import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Courier } from 'app/main/content/apps/e-commerce/courier/courier.model';

@Injectable()
export class EcommerceCourierService implements Resolve<any>
{

    routeParams: any;
    courier = new Courier();
    onCourierChanged: BehaviorSubject<any> = new BehaviorSubject({});

    courierCollection: AngularFirestoreCollection<Courier>;
    courierDoc: AngularFirestoreDocument<Courier>;

    constructor(private http: HttpClient, public afs: AngularFirestore) {

        this.courierCollection = this.afs.collection<any>('courier');
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
                this.getCourier()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCourier(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onCourierChanged.next(false);
                resolve(false);
            }
            else {
                this.afs.collection<any>('courier', ref => {
                    return ref.where('id', '==', this.routeParams.id);
                }).valueChanges().subscribe(data => {
                    this.courier = data[0] as Courier;
                    this.onCourierChanged.next(this.courier);
                    resolve(this.courier);
                });
            }
        });
    }

    saveCourier(courier) {
        courier.id = this.routeParams.id;
        this.courierDoc = this.afs.doc(`courier/${this.routeParams.id}`);
        return this.courierDoc.update(courier);
    }

    deleteCourier(courier) {
        this.courierDoc = this.afs.doc(`courier/${courier.id}`);
        return this.courierDoc.delete();
    }
    addCourier(courier) {
        const id = this.afs.createId();
        courier.id = id;
        return this.courierCollection.doc(id).set(courier);
    }

}
