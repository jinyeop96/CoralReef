import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface User {
    user_name: string,
    user_pwd: string,
    confirmPassword: string,
}
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    constructor(private http: HttpClient) { }
    user: User = {
        user_name: "",
        user_pwd: "",
        confirmPassword: "",
    }
    register() {
        if (this.user.confirmPassword == this.user.user_pwd) {
            var obj = {
                user_name: "",
                user_pwd: "",
            }
            obj.user_name = this.user.user_name
            obj.user_pwd = this.user.user_pwd
            
            this.http.post('/login/register', obj).subscribe((response: any) => {
                if (response.message == "success") {
                    alert("sign up successful");
                } else {
                    alert("sign up failed");
                }
            });
            return;
        }
        alert("The two passwords that you entered do not match!");

    }
}
