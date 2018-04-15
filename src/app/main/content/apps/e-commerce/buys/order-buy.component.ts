import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

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

// import { EcommerceOrderBuyService } from './order-buy.service';

@Component({
  selector: 'fuse-e-commerce-orderbuy',
  templateUrl: './order-buy.component.html',
  styleUrls: ['./order-buy.component.scss'],
  animations: fuseAnimations
})
export class FuseEcommerceOrderBuyComponent implements AfterViewInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['storeName', 'airwaybill', 'orderdate', 'amountProduct', 'amountPrice'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private afs: AngularFirestore) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.afs.collection<any>('orderBuy').valueChanges().subscribe(data => {
      data.map(a => {
        a.amountprice = 0;
        this.afs.collection<any>('store', ref => ref.where('id', '==', a.storeid)).valueChanges().subscribe(store => store.map(c => a.storename = c.name));
        a.invoicebuyid.map(b =>
          this.afs.collection<any>('invoiceBuy', ref => ref.where('id', '==', b)).valueChanges().subscribe(invoices => invoices.map(c => a.amountprice += c.price)));
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
