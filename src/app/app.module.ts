import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {PublicPage} from "./components/pages/public-page";
import {itemsPage} from "./components/pages/items-page";
import {LoggedoutPage} from "./components/pages/loggedout-page";
import {WindowService} from "./services/window.service";
import {AuthService} from "./services/auth.service";
import {CookieService} from "./services/cookies.service";
import {HttpModule} from "@angular/http";
import {itemsDirective} from "./directives/items.directive";
import {Navbar} from "./components/navbar/navbar";
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {path: 'public', pathMatch: 'full', component: PublicPage},
    {path: 'items', pathMatch: 'full', component: itemsPage},
    {path: '', redirectTo: 'public', pathMatch: 'full'},
    {path: 'loggedout', pathMatch: 'full', component: LoggedoutPage}
];

@NgModule({
    declarations: [AppComponent, PublicPage, itemsPage, LoggedoutPage, itemsDirective, Navbar],
    providers: [
        CookieService,
        AuthService,
        WindowService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    imports: [
        HttpModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}