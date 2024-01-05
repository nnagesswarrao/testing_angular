import { Injectable } from '@angular/core';

import { ToastController, AlertController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import { ToastrModule } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { HTTPService } from './http-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  msg = "Please wait...";
  private sideMenuCntrl: BehaviorSubject<any>;
  private shwLdr: BehaviorSubject<any>;
  private shwCntcnErr: BehaviorSubject<any>;
  private actvSuperTabIndx: BehaviorSubject<any>;
  //   private myPrmns: BehaviorSubject<any>;
  //   private rleLst: BehaviorSubject<any>;
  private sessionExpired: BehaviorSubject<boolean>;
  //   private toastr:ToastrService
  private commonHeaders: any = {};
  toast: any;
  private _SERVER: string = environment.origin + '/apiv1';
  USER_PERMISSIONS = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 };
  usrPfleDtls = new BehaviorSubject<any>({});
  mnuLst = new BehaviorSubject<any>([]);

  constructor(public toastController: ToastController,
    private alertController: AlertController,
    private httpSrvc: HTTPService,
    private http: HttpClient,
  ) {
    this.sideMenuCntrl = new BehaviorSubject({
      enable: false
    });
    this.shwLdr = new BehaviorSubject(false);
    this.sessionExpired = new BehaviorSubject(false);
    this.shwCntcnErr = new BehaviorSubject({
      enable: false,
      err_cd: '',
      err_msg: '',
      extra_info: '',
      calback: () => { }
    });
    this.actvSuperTabIndx = new BehaviorSubject(0);
  }

  setCommonHeaders() {
    this.commonHeaders['x-access-token'] = '';
    this.commonHeaders['Accept'] = 'application/json';
    const token: any = localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : '';
    if (token) {
      this.commonHeaders['x-access-token'] = token;
      this.commonHeaders['Cache-Control'] = 'no-cache';
      this.commonHeaders['Pragma'] = 'no-cache';
    }
  }
  saveResponseHeaders(headers: any) {
    if (headers['x-access-token'])
      localStorage.setItem('x-access-token', headers['x-access-token']);
  }



  post(rte: any, postdata: any) {
    return this.httpSrvc.post(rte, postdata);
  }

  postBodyOnly(rte: any, postdata: any) {
    return this.httpSrvc.postBodyOnly(rte, postdata);
  }

  create(rte: any, postdata: any) {
    return this.httpSrvc.create(rte, postdata);
  }

  get(rte: any) {
    return this.httpSrvc.get(rte);
  }

  update(rte: any, postdata: any) {
    return this.httpSrvc.update(rte, postdata);
  }

  delete(rte: any) {
    return this.httpSrvc.delete(rte);
  }

  getbible(rte: any) {
    const _SERVER = `https://api.scripture.api.bible/v1/bibles/${rte}`;
    let headers = new HttpHeaders();
    headers = headers.set('api-key', 'f938dbef4b8d20bf86c8eef1826c1f41');
    return this.http.get(_SERVER, { headers: headers })

  }

}






