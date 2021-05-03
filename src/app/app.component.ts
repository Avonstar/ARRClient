import { Component, OnInit } from '@angular/core';
import { UploadService } from './services/upload.service';
import { Observable, Subject, timer } from 'rxjs';
import { repeatWhen, switchMap, takeUntil, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { UploadSpotsModel } from './models/UploadSpotsModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private stopStatusStream = new Subject();
  private startStatusStream = new Subject();

  spotsSaveStatus$: Observable<UploadSpotsModel> | undefined;
  //spotsSaveStatus$: Observable<HttpResponse<string>> | undefined;

  constructor(public uploadService: UploadService){}

  ngOnInit(): void {

    this.spotsSaveStatus$ = timer(0, 5000)
    .pipe(
      switchMap(() => this.uploadService.getUploadStatus()),
      tap(d => console.log("TAP", d)),
      takeUntil(this.stopStatusStream),
      repeatWhen(() => this.startStatusStream)
    );
  }

  start() {
    this.startStatusStream.next();
    console.log('startStatusStream');
  }

  stop() {
    this.stopStatusStream.next(event);
    console.log('stopStatusStream');
  }


}

