
import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
// import { HTTP } from '@ionic-native/http/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
// import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class HTTPService {

    private sessionExpired: BehaviorSubject<boolean>;
    isHttpProduction = environment.production;
    msg = "Please wait...";
    private commonHeaders: any = {};
    toast: any;
    private _SERVER: string = environment.origin + '/apiv1';
    USER_PERMISSIONS = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 };
    usrPfleDtls = new BehaviorSubject<any>({});
    mnuLst = new BehaviorSubject<any>([]);

    constructor(public toastController: ToastController,
        private http: HTTP,
        private httpClient: HttpClient,
        private navCtrl: NavController,
    ) {
        this.sessionExpired = new BehaviorSubject(false);
    }

    setCommonHeaders(rte: any) {
        console.log('kkkkkkkkkkkkkkkk')
        if (this.isHttpProduction == false) {
            console.log('333333333333333333333')
            this.commonHeaders.headers = {};
            this.commonHeaders.headers['Accept'] = 'application/json';
            this.commonHeaders['observe'] = 'response';
            this.commonHeaders['withCredentials'] = 'true';
            const token: any = localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : '';
            if (token) {
                this.commonHeaders.headers['x-access-token'] = token;
                this.commonHeaders.headers['Cache-Control'] = 'no-cache';
                this.commonHeaders.headers['Pragma'] = 'no-cache';
            }

        } else {
            this.commonHeaders = {};
            this.commonHeaders['x-access-token'] = '';
            this.commonHeaders['origin'] = 'tsrtccommercials.dreamstep.in:9000';
            this.commonHeaders['Accept'] = 'application/json';
            const token: any = localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : '';
            if (token) {
                this.commonHeaders['x-access-token'] = token;
                this.commonHeaders['Cache-Control'] = 'no-cache';
                this.commonHeaders['Pragma'] = 'no-cache';
            }
        }
    }

    saveResponseHeaders(headers: any) {
        if (this.isHttpProduction == false) {
            if (headers.get('x-access-token'))
                localStorage.setItem('x-access-token', headers.get('x-access-token'));
        }
        else {
            if (headers && headers['x-access-token'])
                localStorage.setItem('x-access-token', headers['x-access-token']);
        }
    }
    check(status: any) {
        console.log(status)
    }
    get(rte: any) {

        if (this.isHttpProduction) {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {

                this.http.get(this._SERVER + `/${rte}`, {}, this.commonHeaders).then((response: any) => {

                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);

                    try {
                        const resJson = JSON.parse(response.data);
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }).catch((error) => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
        else {
            console.log('hiii')
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');

            return new Observable((observer) => {
                this.httpClient.get(this._SERVER + `/${rte}`, this.commonHeaders)
                    .subscribe((response: any) => {
                        this.saveResponseHeaders(response.headers);
                        this.check(response.status);
                        try {
                            const resJson = response['body'];
                            observer.next(resJson);
                            return;
                        } catch (e) {
                            observer.error(e);
                            return;
                        }
                    }, (error: HttpErrorResponse) => {
                        this.handleResponseError(error);
                        observer.error(error);
                    });
            });
        }

    }


    post(rte: any, postdata: any) {
        console.log(postdata)
        if (this.isHttpProduction) {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {

                this.http.post(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders).then((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = JSON.parse(response.data);
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }).catch(error => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
        else {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.httpClient.post(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders).subscribe((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = response['body'];
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        console.log(e)
                        observer.error(e);
                        return;
                    }
                }, (error: HttpErrorResponse) => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }

    }

    postBodyOnly(rte: any, postdata: any) {
        if (this.isHttpProduction) {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {

                this.http.post(this._SERVER + `/${rte}`, postdata, this.commonHeaders).then((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = JSON.parse(response.data);
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }).catch(error => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
        else {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.httpClient.post(this._SERVER + `/${rte}`, postdata, this.commonHeaders).subscribe((response: any) => {
                    console.log(response)
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = response['body'];
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        console.log(e)
                        observer.error(e);
                        return;
                    }
                }, (error: HttpErrorResponse) => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }

    }
    create(rte: any, postdata: any) {
        if (this.isHttpProduction) {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.http.setDataSerializer('json');
                this.http.post(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders).then((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = JSON.parse(response.data);
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }).catch((error) => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
        else {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.httpClient.post(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders).subscribe((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = response['body'];
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }, (error: HttpErrorResponse) => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
    }

    update(rte: any, postdata: any) {
        if (this.isHttpProduction) {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.http.setDataSerializer('json');
                this.http.put(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders).then((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = JSON.parse(response.data);
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }).catch(error => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
        else {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.httpClient.put(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders).subscribe((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = response['body'];
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }, (error: HttpErrorResponse) => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
    }

    delete(rte: any) {
        if (this.isHttpProduction) {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.http.delete(this._SERVER + `/${rte}`, {}, this.commonHeaders).then((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = JSON.parse(response.data);
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }).catch(error => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
        else {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer('json');
            return new Observable((observer) => {
                this.httpClient.delete(this._SERVER + `/${rte}`, this.commonHeaders).subscribe((response: any) => {
                    this.saveResponseHeaders(response.headers);
                    this.check(response.status);
                    try {
                        const resJson = response['body'];
                        observer.next(resJson);
                        return;
                    } catch (e) {
                        observer.error(e);
                        return;
                    }
                }, (error: HttpErrorResponse) => {
                    this.handleResponseError(error);
                    observer.error(error);
                });
            });
        }
    }
    put(rte: any, postdata: any) {
        if (this.isHttpProduction) {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer("json");
            return new Observable((observer) => {
                this.http.setDataSerializer("json");
                this.http
                    .put(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders)
                    .then((response: any) => {
                        this.saveResponseHeaders(response.headers);
                        try {
                            const resJson = JSON.parse(response.data);
                            observer.next(resJson);
                            return;
                        } catch (e) {
                            observer.error(e);
                            return;
                        }
                    })
                    .catch((error) => {
                        this.handleResponseError(error);
                        observer.error(error);
                    });
            });
        } else {
            this.setCommonHeaders(rte);
            this.http.setDataSerializer("json");
            return new Observable((observer) => {
                this.httpClient
                    .put(this._SERVER + `/${rte}`, { data: postdata }, this.commonHeaders)
                    .subscribe((response: any) => {
                        this.saveResponseHeaders(response.headers);
                        try {
                            const resJson = response["body"];
                            observer.next(resJson);
                            return;
                        } catch (e) {
                            observer.error(e);
                            return;
                        }
                    }),
                    (error: any) => {
                        this.handleResponseError(error);
                        observer.error(error);
                    };
            });
        }
    }
    handleResponseError(error: any) {
        console.log(error);
        if (error.status == 404) {
            this.showToast(error.message, 3000);
        } else if (error.status == 406 || error.status == 403) {
            this.showToast("Session expired. Please relogin app.", 3000);
            this.navCtrl.navigateRoot('login');
            this.sessionExpired.next(true);
        }
    }
    showToast(msg: any, drtn: any) {
        this.toast = this.toastController.create({
            message: msg,
            duration: drtn
        }).then((toastData) => {
            toastData.present();
        });
    }

    getSessionCtrl = (): Observable<any> => {
        return this.sessionExpired.asObservable();
    }


    


}
