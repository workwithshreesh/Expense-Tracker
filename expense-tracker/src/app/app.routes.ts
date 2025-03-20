import { Routes } from '@angular/router';
import { AuthGuard } from './authGuards/auth.guard';
import { AuthComponent } from './component/auth/auth.component';
import { UpdateComponent } from './component/update/update.component';
import { AddComponent } from './component/add/add.component';
import { LoginauthComponent } from './component/loginauth/loginauth.component';
import { DetailComponent } from './component/detail/detail.component';

export const routes: Routes = [
    // {
    //     path: "",
    //     component: HomeComponent,
    //     canActivate: [AuthGuard]  
    // },
    {
        path: "login",
        component: LoginauthComponent,
        data: { isRegistering: false },
        canActivate: [AuthGuard]  

    },
    {
        path: "register",
        component: AuthComponent,
        data: { isRegistering: true },
        canActivate: [AuthGuard]  

    },
    {
        path:"",
        component:UpdateComponent,
        canActivate: [AuthGuard]  

    },
    {
        path:"add-book",
        component:AddComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"detail",
        component:DetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "login" 
    }
];
