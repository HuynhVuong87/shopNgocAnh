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

import { Store } from './store.model';
import { EcommerceStoreService } from './store.service';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { cities, City, District } from 'app/address/address';

@Component({
    selector: 'fuse-e-commerce-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class StoreComponent implements OnInit, OnDestroy {

    stateCtrl: FormControl;
    filteredCities: Observable<any[]>;
    filteredDistricts: Observable<any[]>;
    cities = cities;

    store = new Store();
    onStoreChanged: Subscription;
    pageType: string;
    storeForm: FormGroup;

    constructor(
        private storeService: EcommerceStoreService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location, private route: ActivatedRoute
    ) { }

    filterStates(name: string, states) {
        return states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    }

    ngOnInit() {
        this.onStoreChanged =
            this.storeService.onStoreChanged
                .subscribe(store => {

                    if (store) {
                        this.store = new Store(store);
                        this.pageType = 'edit';
                    }
                    else {
                        this.pageType = 'new';
                        this.store = new Store();
                    }

                    this.storeForm = this.createStoreForm();

                    this.stateCtrl = new FormControl();
                    this.filteredCities = this.storeForm.get('city').valueChanges
                        .pipe(
                            startWith(''),
                            map(state => state ? this.filterStates(state, this.cities) : this.cities.slice())
                        );
                    this.filteredDistricts = this.storeForm.get('district').valueChanges
                        .pipe(
                            startWith(''),
                            map(state => state ? this.cities.filter(stat =>
                                stat.name.toLowerCase().indexOf(this.storeForm.get('city').value.toLowerCase()) === 0
                            ).map(a =>
                                this.filterStates(state, a.districts)
                            ).reduce((a, b) => a.concat(b, [])) : this.cities.filter(stat =>
                                stat.name.toLowerCase().indexOf(this.storeForm.get('city').value.toLowerCase()) === 0
                            ).map(a => a.districts).reduce((a, b) => a.concat(b, [])).slice())
                        );
                });
    }
    ngOnDestroy() {
        this.onStoreChanged.unsubscribe();
    }

    createStoreForm() {
        return this.formBuilder.group({
            id: [this.store.id],
            name: [this.store.name],
            email: [this.store.email],
            keeper: [this.store.keeper],
            phone: [this.store.phone],
            city: [this.store.city],
            district: [this.store.district],
            address: [this.store.address],
        });
    }

    saveStore() {
        const data = this.storeForm.getRawValue();
        this.storeService.saveStore(data)
            .then(() => {

                // Trigger the subscription with new data
                this.storeService.onStoreChanged.next(data);

                // Show the success message
                this.snackBar.open('Store saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }

    deleteStore() {
        const alert = confirm('DELETE THIS STORE?');
        if (alert === true) {
            const data = this.storeForm.getRawValue();
            this.storeService.deleteStore(data)
                .then(() => {

                    // Trigger the subscription with new data
                    this.storeService.onStoreChanged.next(false);

                    // Show the success message
                    this.snackBar.open('Store deleted', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    this.location.go('apps/e-commerce/stores/new');
                });
        }
    }

    addStore() {
        const data = this.storeForm.getRawValue();
        this.storeService.addStore(data).then(() => {

            // Trigger the subscription with new data
            this.storeService.onStoreChanged.next(data);

            // Show the success message
            this.snackBar.open('Store added', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one
            this.location.go('apps/e-commerce/stores/' + this.store.id + '/' + this.store.name);
        });
    }
}
