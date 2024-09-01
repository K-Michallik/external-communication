import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private echoSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    
    public readonly echo$: Observable<string | null> = this.echoSubject.asObservable();

    constructor(private http: HttpClient) {}




    echoServer(url: string, ip: string, port: string, message:string): void {
        const fullUrl = 'http://' + url + `/connect?ip=${ip}&port=${port}&message=${encodeURIComponent(message)}`;
        this.http.get<{ echoString: string }>(fullUrl).subscribe(response => {
          this.echoSubject.next(response.echoString);
        });
      }



}











