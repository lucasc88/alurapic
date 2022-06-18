import { Injectable } from "@angular/core";

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    hasToken() {
        //!! to parse string to boolean. If there is, the first ! parse to false and the second parse to true
        return !!this.getToken();
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }
}