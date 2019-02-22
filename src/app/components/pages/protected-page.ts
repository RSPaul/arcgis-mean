/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:56 AM
 */
import {Component} from "@angular/core";
import {ItemService} from "../services/items.service";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'protected-page',
    directives: [],
    pipes: [],
    template: `
<div class="pos-f-t">
    <navbar></navbar>
</div>
<div protected>I'm protected</div>
`
})
export class ProtectedPage {
    
    userName: string;

    constructor(private itemService: ItemService, private authService: AuthService) {
    	
    	this.userName = authService.getUserName();
    }

    ngOnInit() {

    	itemService.getItems(this.userName);
    }
}
