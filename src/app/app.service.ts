import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class F06MeteoComponentService {
    
  constructor(private http: HttpClient) { }

  public getFormation(): Observable<any> {
    const urlService:string = "/njsite/catalogue";
    const data = "";
    return this.http.post(urlService,data,{ headers: new HttpHeaders(environment.headers)});
  }
      
      
  // post(url: string, body: any, options: { headers?: HttpHeaders | { [header: string]: string | string[]; }; context?: HttpContext; observe?: "body"; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | ... 1 more ... | boolean)[]; }; reportProgress?: boolean; responseType: "arraybuffer"; withCredentials?: boolean; }): Observable<ArrayBuffer>

  // $http({
  //   method : 'POST',
  //   url : serviceApp.getUrlServiceAltercampus() + '/getLogoPlateforme',
  //   headers: {
  //     'Content-Type' : 'application/json',
  //     'token' : serviceApp.getTokenAuthentification()
  //   }
  // })
    

}