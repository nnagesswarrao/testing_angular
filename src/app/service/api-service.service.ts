import { Injectable } from '@angular/core';

import { ToastController, AlertController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import { ToastrModule } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { HTTPService } from './http-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import bibileJson from '../../assets/bible.json';

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

console.log(bibileJson)

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

  // getbible(rte: any) {
  //   const _SERVER = `https://api.scripture.api.bible/v1/bibles/${rte}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.set('api-key', 'f938dbef4b8d20bf86c8eef1826c1f41');
  //   return this.http.get(_SERVER, { headers: headers })

  // }

  getBibleBooks = () => {

    return [
      "ఆదికాండము", "నిర్గమకాండము", "లేవీయకాండము", "సంఖ్యాకాండము", "ద్వితీయోపదేశకాండమ", "యెహొషువ",
      "న్యాయాధిపతులు", "రూతు", "సమూయేలు మొదటి గ్రంథము", "సమూయేలు రెండవ గ్రంథము", "రాజులు మొదటి గ్రంథము",
      "రాజులు రెండవ గ్రంథము", "దినవృత్తాంతములు మొదటి గ్రంథము", "దినవృత్తాంతములు రెండవ గ్రంథము", "ఎజ్రా", "నెహెమ్యా", "ఎస్తేరు", "యోబు గ్రంథము",
      "కీర్తనల గ్రంథము", "సామెతలు", "ప్రసంగి", "పరమగీతము", "యెషయా గ్రంథము", "యిర్మీయా", "విలాపవాక్యములు", "యెహెజ్కేలు",
      "దానియేలు", "హొషేయ", "యోవేలు", "ఆమోసు", "ఓబద్యా", "యోనా", "మీకా", "నహూము", "హబక్కూకు", "జెఫన్యా",
      "హగ్గయి", "జెకర్యా", "మలాకీ", "మత్తయి సువార్త", "మార్కు సువార్త", "లూకా సువార్త", "యోహాను సువార్త", "అపొస్తలుల కార్యములు",
      "రోమీయులకు", "1 కొరింథీయులకు", "2 కొరింథీయులకు", "గలతీయులకు", "ఎఫెసీయులకు", "ఫిలిప్పీయులకు",
      "కొలొస్సయులకు", "1 థెస్సలొనీకయులకు", "2 థెస్సలొనీకయులకు", "1 తిమోతికి", "2 తిమోతికి", "తీతుకు", "ఫిలేమోనుకు",
      "హెబ్రీయులకు", "యాకోబు", "1 పేతురు", "2 పేతురు", "1 యోహాను", "2 యోహాను", "3 యోహాను", "యూదా", "ప్రకటన గ్రంథము"];
  }

getBible=()=>{
  return bibileJson
}


}






