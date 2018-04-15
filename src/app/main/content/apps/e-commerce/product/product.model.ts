import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

import { Injectable } from '@angular/core';
import { ImageUpload } from '../product/image-upload';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

export class Product {

    basePath = 'ImageUploads';
    ImageUploads: Observable<ImageUpload[]>;

    id: string;
    name: string;
    create_at: Date;
    category: string[];
    images: {
        url: string;
        name: string;
    }[];
    sku: {
        skuName: string;
        skuUrl_Image: string;
        long: number;
        width: number;
        height: number;
        weight: number;
    }[];

    constructor(product?) {
        product = product || {};
        this.id = product.id || '';
        this.name = product.name || '';
        this.create_at = product.description || '';
        this.category = product.category || [];
        this.images = product.image || [];
        this.sku = product.images || [{
            skuName: '',
            skuUrl_Image: '',
            long: '',
            width: '',
            height: '',
            weight: '',
        }];
    }

    addCategory(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add category
        if (value) {
            this.category.push(value);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeCategory(category) {
        const index = this.category.indexOf(category);

        if (index >= 0) {
            this.category.splice(index, 1);
        }
    }
}
