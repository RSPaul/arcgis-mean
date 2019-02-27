/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from 'rxjs/Rx';
@Injectable()
export class ItemService {

	baseUrl: string = 'https://www.arcgis.com';

    constructor(private http: Http) {
        this.http.get('config.json')
            .map(res => res.json())
            .subscribe((config: any) => {
              
            })
    }


    getItems(userName: string, token: string) : Observable<any> {

        return this.http.get(this.baseUrl + '/sharing/rest/content/users/' + userName + '?token=' + token + '&f=json')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    addTags(postData: any) : Observable<any> {

    	return this.http.post(this.baseUrl + '/sharing/rest/content/users/'+ postData.user +'/items/'+ postData.itemId +'/update'+'?token=' + postData.token + '&f=json&tags=' + postData.tags)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error || 'Server error'));
    }


}

