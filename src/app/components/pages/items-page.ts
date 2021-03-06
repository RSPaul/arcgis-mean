/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:56 AM
 */
import {Component, Input} from "@angular/core";
import {ItemService} from "../../services/items.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { FormGroup, NgModel,  FormBuilder, Validators } from '@angular/forms';
// import * as $ from 'jquery';


@Component({
    selector: 'items-page',
    directives: [],
    pipes: [],
    providers: [ItemService, AuthService],
    template: `
<div class="pos-f-t">
    <navbar></navbar>
</div>
<div items><div class="container">
  <div class="col-md-12"><div class="col-md-6"><h3>My Items</h3> </div><div class="col-md-6 pull-right"><div class="col-md-3"></div><div class="col-md-3"></div><div class="col-md-3"></div><button (click)="isSuccess = false; isError = false;" type="button" class="btn btn-success" data-toggle="modal" data-target="#tagsModal">Add Tags</button></div></div><div><div class="clearfix"></div>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>S. No.</th>
        <th>Title</th>
        <th>Access</th>
        <th>Type</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of items; let i = index">
        <td>{{i+1}}</td>
        <td>{{item.title}}</td>
        <td>{{item.access}}</td>
        <td>{{item.type}}</td>
        <td>{{item.tags}}</td>
      </tr>
    </tbody>
  </table>
  <div class="loading text-center" *ngIf="!items">{{loadText}}</div>
</div>
<div class="modal fade" id="tagsModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <form novalidte>
	      <div class="modal-content">
	        <div class="modal-header">
	        <div class="alert alert-success" *ngIf="isSuccess">
			  <strong>Success!</strong> Item details has been updated.
			</div>

			<div class="alert alert-danger" *ngIf="isError">
			  <strong>Info!</strong> Error updating item, please try again.
			</div>
	          <button type="button" class="close" data-dismiss="modal">&times;</button>
	          <h4 class="modal-title">Add Tags</h4>
	        </div>
	        <div class="modal-body">
	          
	          	<div class="form-group">
	          		<label>Select Item</label>
	          		<select name="item" class="form-control" id="selectedItem" (change)="changeItem($event.target.value)" [(ngModel)]="selectedItem">
	          			<option *ngFor="let item of items" value="{{item.id}}">
	          				{{item.title}}
	          			</option>
	          		</select>
	          	</div>
	          	<div class="form-group">
	          		<label>Enter Tags<span> (use spaces between words to enter multiple tags)</span></label>
	          		<input type="text" name="tags" id="updatedTags" class="form-control"  [(ngModel)]="updatedTags">
	          	</div>
	          	
	        
	        </div>
	        <div class="modal-footer">
	        	<button type="button" name="submit" class="btn btn-success" (click)="addTags()">{{submitText}}</button>
	          	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        </div>
	      </div>
     </form>
    </div>
  </div>
</div>
`
})
export class itemsPage {
    
    userName: string;
    items: any;
    userToken: string;
    selectedItem: any;
    updatedTags: any = '';
    loadText: string = 'Loading...';
    submitText: string = 'Submit';
    isSuccess: boolean = false;
    isError: boolean = false;

    constructor(private itemService: ItemService, private authService: AuthService, private router: Router) {
    	
    	this.userName = this.authService.getUserName();
    	this.userToken = this.authService.getUserToken();
    }

    ngOnInit() {

    	this.getItems();
    }

    getItems() {
    	this.updatedTags = '';
    	this.itemService.getItems(this.userName, this.userToken).subscribe((response) => {
    		this.items = response.items;
    		this.selectedItem = (this.items) ? this.items[0].id : '';
    		if(this.selectedItem) {
	    		this.items[0].tags.map(title => {
	    			this.updatedTags = this.updatedTags + title + ' ';
	    		});
	    	} else {
                this.loadText = 'You token is expired, please logout and login again to continue.'
	    		this.router.navigate(['/loggedout']);
	    	}
    	});
    }

    addTags() {

    	this.submitText = 'Please Wait..';
    	let postData = {user: this.userName, itemId: this.selectedItem, tags: this.updatedTags, token: this.userToken};
    	this.itemService.addTags(postData).subscribe((response) => {
    		this.submitText = 'Submit';
    		if(response && response.success) {
    			this.isSuccess = true;
    			this.getItems();
    		} else {
    			this.isError = true;
    		}
    	});
    }

    changeItem(value: string) {

    	this.items.map(item => {
   		if(item.id === value) {
    			this.updatedTags = '';
    			item.tags.map(i => {
    				this.updatedTags = this.updatedTags + i + ' ';
    			});
    		}
    	});
    }

}
