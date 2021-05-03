import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UploadSpotsModel } from '../models/UploadSpotsModel';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  getUploadStatus() {
    let url = "http://localhost:45199/Spots/SaveStatus";

    return this.http.get<UploadSpotsModel>(url);
  }

}
