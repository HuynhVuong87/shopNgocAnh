import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { ImageUpload } from './image-upload';
import { ImageUploadService } from '../upload.service';
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

import { Product } from './product.model';
import { EcommerceProductService } from './product.service';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fuse-e-commerce-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FuseEcommerceProductComponent implements OnInit, OnDestroy {
    // upload: ImageUpload;

    product: any;
    productId: string;
    onProductChanged: Subscription;
    pageType: string;
    productForm: FormGroup;
    skuForm: FormGroup[];
    uploads = [];
    selectedFiles: FileList;
    currentUpload: ImageUpload;
    num = [];
    skuUpdate = [];
    skuDelete = [];
    skuAdd = [];

    constructor(
        // private upSvc: ImageUploadService,
        private productService: EcommerceProductService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location, private route: ActivatedRoute
    ) {
        this.route.params.subscribe(res => this.productId = res.id);
        // console.log(this.productId);
    }

    options = this.productService.getCategory();

    ngOnInit() {
        // this.product.images = this.upSvc.getImageUploads();
        // console.log(this.product.images);
        // Subscribe to update product on changes
        this.onProductChanged =
            this.productService.onProductChanged
                .subscribe(product => {

                    if (product) {
                        this.product = product;
                        this.pageType = 'edit';
                    }
                    else {
                        this.pageType = 'new';
                        this.product = new Product();
                    }

                    this.createProductForm();
                });
        this.onChanges();
    }

    onChanges(): void {
        this.skuForm.map(form => {
            form.valueChanges.subscribe(data => {
                if (this.skuUpdate.indexOf(data.skuName) === -1){
                    this.skuUpdate.push(data.skuName);
                }
            });
        });
      }

    ngOnDestroy() {
        this.onProductChanged.unsubscribe();
    }

    skuFormInvalid() {
        let invalid = false;
        for (let i = 0; i < this.skuForm.length; i++) {
            if (this.skuForm[i].invalid) {
                invalid = true;
                break;
            } else {
                invalid = false;
            }
        }
        return invalid;
    }

    detectFiles(event, i?) {
        this.selectedFiles = event.target.files;
        this.uploadMulti(i);
    }

    uploadMulti(i) {
        const files = this.selectedFiles;
        this.num = Array(files.length).fill(files.length);
        const filesIndex = _.range(files.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new ImageUpload(files[idx]);
            this.productService.pushImageUpload(this.currentUpload).then((data: any) => {
                if (i) {
                    this.product.sku[i].skuUrl_Image = data.url;
                    this.skuForm[i].patchValue({
                        skuUrl_Image: [this.product.sku[i].skuUrl_Image]
                    });
                } else {
                    this.product.images.push(data);
                    console.log(this.product.images);
                    this.productForm.patchValue({ images: this.product.images });
                }
            });
        });
    }

    setTop(i) {
        const data = this.productForm.getRawValue() as Product;
        console.log(data);
        if (i > 0 && i < data.images.length) {
            const temp = data.images[0];
            data.images[0] = data.images[i];
            data.images[i] = temp;
        }
        // this.save(data);
    }

    deleteImage(image) {
        if (image.name !== '') {
            this.productService.deleteImageUpload(image);
        }
        this.product.images.splice(this.product.images.indexOf(image), 1);
        this.productForm.patchValue({ image: this.product.image });
    }

    createProductForm() {
        this.productForm = this.formBuilder.group({
            id: [this.product.id],
            name: [this.product.name],
            create_at: [this.product.create_at],
            category: [this.product.category],
            images: [this.product.images]
        });
        this.skuForm = [];
        this.product.sku.map(sku => {
            this.skuForm.push(this.formBuilder.group({
                skuUrl_Image: [sku.skuUrl_Image],
                skuName: [sku.skuName],
                long: [sku.long],
                width: [sku.width],
                height: [sku.height],
                weight: [sku.weight],
            }));
        });
    }

    newSku() {
        const sku = {
            skuUrl_Image: '',
            skuName: '',
            long: '',
            width: '',
            height: '',
            weight: '',
        };
        this.product.sku.push(sku);
        this.skuForm.push(this.formBuilder.group({
            skuUrl_Image: [sku.skuUrl_Image],
            skuName: [sku.skuName],
            long: [sku.long],
            width: [sku.width],
            height: [sku.height],
            weight: [sku.weight],
        }));
    }

    delSku(i) {
        // if (this.product.sku[i].skuUrl_Image !== '') {
        //     const alert = confirm('DELETE?');
        //     if (alert === true) {
        //         this.product.sku.splice(this.product.sku.indexOf(this.product.sku[i]), 1);
        //         this.skuForm.splice(this.skuForm.indexOf(this.skuForm[i]), 1);
        //     }
        // } else {
            this.product.sku.splice(this.product.sku.indexOf(this.product.sku[i]), 1);
            this.skuForm.splice(this.skuForm.indexOf(this.skuForm[i]), 1);
            this.skuDelete.push(this.skuForm[i].get('skuName'));
        // }
    }

    saveProduct() {
        const basic = this.productForm.getRawValue();
        const classify = this.skuForm.map(form => form.getRawValue());
        console.log(this.skuUpdate);
        console.log(this.skuDelete);
        const del = this.skuDelete.map(sku => {
            return this.skuForm[sku].getRawValue();
        });
        console.log(del);
        this.productService.saveProduct(basic, classify)
            .then((data) => {

                // Trigger the subscription with new data
                this.productService.onProductChanged.next(data);

                // Show the success message
                this.snackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }

    deleteProduct() {
        const alert = confirm('DELETE THIS PRODUCT?');
        if (alert === true) {
            const data = this.productForm.getRawValue();
            this.productService.deleteProduct(data)
                .then(() => {

                    // Trigger the subscription with new data
                    this.productService.onProductChanged.next(false);

                    // Show the success message
                    this.snackBar.open('Product deleted', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                    this.location.go('apps/e-commerce/products/new');
                });
        }
    }

    // addProduct() {
    //     const data = this.productForm.getRawValue();
    //     this.productService.addProduct(data).then(() => {

    //         // Trigger the subscription with new data
    //         this.productService.onProductChanged.next(data);

    //         // Show the success message
    //         this.snackBar.open('Product added', 'OK', {
    //             verticalPosition: 'top',
    //             duration: 2000
    //         });

    //         // Change the location with new one
    //         this.location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.name);
    //     });
    // }
}
