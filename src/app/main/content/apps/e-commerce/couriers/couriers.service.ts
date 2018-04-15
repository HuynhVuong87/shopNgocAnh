import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


@Injectable()
export class EcommerceCouriersService implements Resolve<any>
{
    couriers: any[];
    onCouriersChanged: BehaviorSubject<any> = new BehaviorSubject({});

    courierCollection: AngularFirestoreCollection<any>;

    constructor(private http: HttpClient, public afs: AngularFirestore){
        this.courierCollection = this.afs.collection('courier', ref => ref.orderBy('name'));
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
                this.getCouriers()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCouriers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.courierCollection.snapshotChanges()
                .subscribe((response: any) => {
                    this.couriers = response;
                    this.onCouriersChanged.next(this.couriers);
                    resolve(response);
                }, reject);
        });
    }
}
