import { Directive, Input, OnInit, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from '@firebase/util';

@Directive({
    selector: '[fuseProduct]'
})
export class ProductDirective implements OnInit {

    @Input('Product') data: any;
    @Output() getProduct = new EventEmitter<Object>();

    filteredProducts: Observable<any[]>;
    Products: any;

    filterStates(name, states) {
        return states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    }

    constructor(public afs: AngularFirestore) { }

    ngOnInit() {
        this.afs.collection<any>('products').valueChanges().subscribe(pro => {
            this.filteredProducts = this.data.valueChanges
                .pipe(
                    startWith(''),
                    map(state => state ? this.filterStates(state, pro) : pro.slice())
                );
            this.getProduct.emit(this.filteredProducts);
        });
    }

}

@Directive({
    selector: '[fuseSku]'
})
export class SkuDirective implements OnChanges {

    @Input('Sku') data: any;
    @Output() getSku = new EventEmitter<Object>();

    cities = [];
    filteredSku: Observable<any[]>;

    filterStates(name, states) {
        return states.filter(state =>
            state.name.indexOf(name) > -1);
    }

    constructor(public afs: AngularFirestore) { }

    ngOnChanges(changes: SimpleChanges) {
        this.afs.doc<any>(`products/${this.data.proId}`).collection('sku').valueChanges().subscribe(sku => {
            this.filteredSku = this.data.sku.valueChanges
                .pipe(
                    startWith(''),
                    map(state => sku.slice())
                );
            this.filteredSku.subscribe(data => console.log(data));
            this.getSku.emit(this.filteredSku);
        });
    }

}
