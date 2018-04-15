import { Injectable } from '@angular/core';
import { ImageUpload } from '../e-commerce/product/image-upload';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageUploadService {

  basePath = 'ImageUploads';
  ImageUploadsRef: AngularFireList<ImageUpload>;
  ImageUploads: Observable<ImageUpload[]>;
  url: string;
  imageUrl = [];

  constructor(private db: AngularFireDatabase) { }

  getImageUploads() {
    this.db.list(this.basePath).snapshotChanges().subscribe((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        this.imageUrl.push(data.url);
        // return { $key, ...data };
      });
    });
    // console.log(this.imageUrl);
    return this.imageUrl;
  }

  deleteImageUpload(imageUpload: ImageUpload) {
    this.deleteFileData(imageUpload.$key)
      .then(() => {
        this.deleteFileStorage(imageUpload.name);
      })
      .catch((error) => console.log(error));
  }

  // Executes the file ImageUploading to firebase https://firebase.google.com/docs/storage/web/ImageUpload-files
  pushImageUpload(imageUpload: ImageUpload) {
    const storageRef = firebase.storage().ref();
    const ImageUploadTask = storageRef.child(`${this.basePath}/${imageUpload.file.name}`).put(imageUpload.file).then((snapshot) => {
      this.url = snapshot.downloadURL;
      this.db.list(`${this.basePath}`).push(imageUpload);
      return this.url;
    });
  }
  // sau() {
  //   console.log(this.url);
  //   // return this.url;
  // }
  // test(ImageUpload: ImageUpload) {
  //   this.pushImageUpload(ImageUpload).then(() => {
  //     console.log('a');
  //     console.log(this.url);
  //     this.sau();
  //   });
  // }

  // Writes the file details to the realtime db
  // private saveFileData(ImageUpload: ImageUpload) {
  //   this.db.list(`${this.basePath}/`).push(ImageUpload);
  // }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
