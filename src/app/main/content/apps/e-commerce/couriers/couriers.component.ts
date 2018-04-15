import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceCouriersService } from './couriers.service';

@Component({
  selector: 'fuse-e-commerce-couriers',
  templateUrl: './couriers.component.html',
  styleUrls: ['./couriers.component.scss'],
  animations: fuseAnimations
})
export class FuseEcommerceCouriersComponent implements AfterViewInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['name', 'email', 'phone', 'address'];

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
      this.afs.collection<any>('courier').valueChanges().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
  }

}
