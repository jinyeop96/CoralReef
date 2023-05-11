import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapService } from 'src/app/services/map.service';
import { Router } from '@angular/router';
interface User {
    user_name: string,
    user_pwd: string,
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user: User = {
        user_name: "",
        user_pwd: "",
    }
    constructor(public router: Router, private http: HttpClient, private map: MapService) { }

    login() {
        this.http.post('/login/login', this.user).subscribe((response: any) => {
            if (response.message == "success") {
                this.map.user = this.user.user_name;
                localStorage.setItem('user', this.user.user_name)
                this.router.navigate(['']);
            } else {
                alert("Wrong account or password");
            }
        });
    }
}
