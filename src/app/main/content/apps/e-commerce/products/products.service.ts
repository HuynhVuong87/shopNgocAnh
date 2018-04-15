import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


@Injectable()
export class EcommerceProductsService implements Resolve<any>
{
    products: any[];
    onProductsChanged: BehaviorSubject<any> = new BehaviorSubject({});

    productCollection: AngularFirestoreCollection<any>;

    constructor(private http: HttpClient, public afs: AngularFirestore){
        this.productCollection = this.afs.collection('product', ref => ref.orderBy('name'));
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
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProducts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.productCollection.snapshotChanges()
                .subscribe((response: any) => {
                    this.products = response;
                    this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }
}
