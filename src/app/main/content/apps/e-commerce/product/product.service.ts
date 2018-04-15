import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from 'app/main/content/apps/e-commerce/product/product.model';
import { ImageUpload } from '../product/image-upload';

@Injectable()
export class EcommerceProductService implements Resolve<any>
{
    basePath = 'ImageUploads';
    ImageUploads: Observable<ImageUpload[]>;
    url: string;

    routeParams: any;
    product = new Product();
    onProductChanged: BehaviorSubject<any> = new BehaviorSubject({});

    productCollection: AngularFirestoreCollection<Product>;
    productDoc: AngularFirestoreDocument<Product>;
    categories = [];

    constructor(private http: HttpClient, public afs: AngularFirestore) {

        this.productCollection = this.afs.collection<any>('product');
    }

    getCategory() {
        this.afs.collection<any>('product').snapshotChanges().subscribe(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Product;
                for (let i = 0; i < data.category.length; i++) {
                    if (this.categories.indexOf(data.category[i]) === -1) {
                        this.categories.push(data.category[i]);
                    }
                }
            });
        });
        return this.categories;
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
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else {
                this.afs.collection<any>('products', ref => {
                    return ref.where('id', '==', this.routeParams.id);
                }).valueChanges().subscribe(data => {
                    this.afs.collection<any>('products').doc(this.routeParams.id).collection<any>('sku').valueChanges().subscribe(dat => {
                        data[0].sku = dat;
                        this.product = data[0] as Product;
                        this.onProductChanged.next(this.product);
                        resolve(this.product);
                    });
                });
            }
        });
    }

    saveProduct(basic: any, classify) {
        basic.id = this.routeParams.id;
        return new Promise((resolvep, rejectp) => {
            this.productDoc = this.afs.doc(`products/${this.routeParams.id}`);
            this.productDoc.update(basic).then(() => {
                classify.map(sku => {
                    this.afs.collection<any>('products').doc(this.routeParams.id).collection<any>('sku').doc(sku.skuName).update(sku).then(() => {
                    });
                });
                basic.sku = classify;
                resolvep(basic);
            });
        });
    }

    deleteProduct(product) {
        for (let i = 0; i < product.images.length; i++) {
            const storageRef = firebase.storage().ref();
            storageRef.child(`${this.basePath}/${product.images[i].name}`).delete();
        }
        this.productDoc = this.afs.doc(`product/${product.id}`);
        return this.productDoc.delete();
    }
    addProduct(product) {
        const id = this.afs.createId();
        product.id = id;
        return this.productCollection.doc(id).set(product);
    }

    pushImageUpload(imageUpload: ImageUpload) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${imageUpload.file.name}`).put(imageUpload.file);

        return new Promise((resolve, reject) => {
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    // upload in progress
                    imageUpload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
                    // console.log(ImageUpload.progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // upload success
                    resolve({url: uploadTask.snapshot.downloadURL, name: imageUpload.file.name});
                }
            );
        });
    }

    deleteImageUpload(image) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${image.name}`).delete();
    }

}
