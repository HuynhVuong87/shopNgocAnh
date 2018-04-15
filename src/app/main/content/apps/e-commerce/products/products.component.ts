import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from './products.service';

@Component({
    selector   : 'fuse-e-commerce-products',
    templateUrl: './products.component.html',
    styleUrls  : ['./products.component.scss'],
    animations : fuseAnimations
})
export class FuseEcommerceProductsComponent implements AfterViewInit
{
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['image', 'name', 'sku'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private afs: AngularFirestore){}

    applyFilter(filterValue: string){
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    ngAfterViewInit(){
        const arr = [];
        this.afs.collection<any>('products').valueChanges().subscribe(data => {
            Promise.all(data.map(pro => {
                return new Promise((resolve1, reject1) => {
                    this.afs.collection<any>('products').doc(pro.id).collection<any>('sku').valueChanges().subscribe(dat => {
                        pro.sku = dat.length;
                        pro.skuUrl_Image = dat[0].skuUrl_Image;
                        resolve1();
                    });
                });
            })).then(() => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        });
    }
}
