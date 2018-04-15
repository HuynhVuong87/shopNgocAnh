import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceOrdersService } from './orders.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector   : 'fuse-e-commerce-orders',
    templateUrl: './orders.component.html',
    styleUrls  : ['./orders.component.scss'],
    animations : fuseAnimations
})
export class FuseEcommerceOrdersComponent implements OnInit
{
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['id', 'source', 'name', 'city', 'total', 'payment', 'status', 'date'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private afs: AngularFirestore) {}

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
      }

    ngOnInit()
    {
        this.afs.collection<any>('orderSell').valueChanges().subscribe(data => {
            data.map(a => {
              a.amountprice = 0;
              a.invoicesellid.map(b =>
                this.afs.collection<any>('invoiceSell', ref => ref.where('id', '==', b)).valueChanges().subscribe(invoices =>
                    invoices.map(c => a.amountprice += c.price * c.quantity))
                );
            });
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
    }
}
