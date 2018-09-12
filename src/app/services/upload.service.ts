import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
public url: string;
  constructor() {
    this.url = GLOBAL.url;
   }

   makeFileRequest(path: string, id: string, params: Array<string>, files: Array<File>, token: string, name: string) {
     return new Promise((resolve,reject) => {
       let formData = new FormData;
       let xhr = new XMLHttpRequest();

       for ( let i = 0; i <  files.length; i++) {
        formData.append(name, files[i], files[i].name);
       }

       xhr.onreadystatechange = () => {
         if (xhr.readyState === 4) {
           if (xhr.status === 200) {
             resolve(JSON.parse(xhr.response));
           } else {
             reject(xhr.response);
           }
         }
       };

       xhr.open('POST', this.url + '' + path + '/' + id, true);
       xhr.setRequestHeader('Authorization', token);
       xhr.send(formData);
     });
   }
}
