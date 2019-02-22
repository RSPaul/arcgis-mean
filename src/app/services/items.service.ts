/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ItemService {



    constructor(private windows: WindowService, private http: Http) {
        //noinspection TypeScriptUnresolvedFunction
        http.get('config.json')
            .map(res => res.json())
            .subscribe((config: any) => {
              
            })
    }

    private getItems(username) {
        console.log('get items');
    }

}

