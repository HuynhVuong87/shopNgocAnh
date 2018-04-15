import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Courier } from './courier.model';
import { EcommerceCourierService } from './courier.service';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { cities, City, District } from 'app/address/address';

@Component({
  selector: 'fuse-e-commerce-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FuseEcommerceCourierComponent implements OnInit, OnDestroy {

  stateCtrl: FormControl;
  filteredCities: Observable<any[]>;
  filteredDistricts: Observable<any[]>;
  cities = cities;

  courier = new Courier();
  onCourierChanged: Subscription;
  pageType: string;
  courierForm: FormGroup;

  constructor(
      private courierService: EcommerceCourierService,
      private formBuilder: FormBuilder,
      public snackBar: MatSnackBar,
      private location: Location, private route: ActivatedRoute
  ) { }

  filterStates(name: string, states) {
      return states.filter(state =>
          state.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  }

  ngOnInit() {
      this.onCourierChanged =
          this.courierService.onCourierChanged
              .subscribe(courier => {

                  if (courier) {
                      this.courier = new Courier(courier);
                      this.pageType = 'edit';
                  }
                  else {
                      this.pageType = 'new';
                      this.courier = new Courier();
                  }

                  this.courierForm = this.createCourierForm();

                  this.stateCtrl = new FormControl();
                  this.filteredCities = this.courierForm.get('city').valueChanges
                      .pipe(
                          startWith(''),
                          map(state => state ? this.filterStates(state, this.cities) : this.cities.slice())
                      );
                  this.filteredDistricts = this.courierForm.get('district').valueChanges
                      .pipe(
                          startWith(''),
                          map(state => state ? this.cities.filter(stat =>
                              stat.name.toLowerCase().indexOf(this.courierForm.get('city').value.toLowerCase()) === 0
                          ).map(a =>
                              this.filterStates(state, a.districts)
                          ).reduce((a, b) => a.concat(b, [])) : this.cities.filter(stat =>
                              stat.name.toLowerCase().indexOf(this.courierForm.get('city').value.toLowerCase()) === 0
                          ).map(a => a.districts).reduce((a, b) => a.concat(b, [])).slice())
                      );
              });
  }
  ngOnDestroy() {
      this.onCourierChanged.unsubscribe();
  }

  createCourierForm() {
      return this.formBuilder.group({
          id: [this.courier.id],
          name: [this.courier.name],
          email: [this.courier.email],
          phone: [this.courier.phone],
          city: [this.courier.city],
          district: [this.courier.district],
          address: [this.courier.address],
          shipIdFormat: [this.courier.shipIdFormat],
          trackingUrlFormat: [this.courier.trackingUrlFormat],
      });
  }

  saveCourier() {
      const data = this.courierForm.getRawValue();
      this.courierService.saveCourier(data)
          .then(() => {

              // Trigger the subscription with new data
              this.courierService.onCourierChanged.next(data);

              // Show the success message
              this.snackBar.open('Courier saved', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
              });
          });
  }

  deleteCourier() {
      const alert = confirm('DELETE THIS STORE?');
      if (alert === true) {
          const data = this.courierForm.getRawValue();
          this.courierService.deleteCourier(data)
              .then(() => {

                  // Trigger the subscription with new data
                  // this.productService.onProductChanged.next(data);

                  // Show the success message
                  this.snackBar.open('Courier deleted', 'OK', {
                      verticalPosition: 'top',
                      duration: 2000
                  });

                  this.location.go('apps/e-commerce/couriers/new');
              });
      }
  }

  addCourier() {
      const data = this.courierForm.getRawValue();
      this.courierService.addCourier(data).then(() => {

          // Trigger the subscription with new data
          this.courierService.onCourierChanged.next(data);

          // Show the success message
          this.snackBar.open('Courier added', 'OK', {
              verticalPosition: 'top',
              duration: 2000
          });

          // Change the location with new one
          this.location.go('apps/e-commerce/couriers/' + this.courier.id + '/' + this.courier.name);
      });
  }
}
