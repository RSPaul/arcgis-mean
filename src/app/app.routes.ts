/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 6/23/16
 * Time: 9:51 PM
 */
import {PublicPage} from "./components/pages/public-page";
import {ItemsPage} from "./components/pages/items-page";
import {LoggedoutPage} from "./components/pages/loggedout-page";

export const AppRoutes: Array<Object> = [
    {path: 'public', pathMatch: 'full', component: PublicPage},
    {path: 'items', pathMatch: 'full', component: ItemsPage},
    {path: '', redirectTo: 'public', pathMatch: 'full'},
    {path: 'loggedout', pathMatch: 'full', component: LoggedoutPage}
];

