import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Photo } from "./photo";

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }

    //GET to http://localhost:3000/flavio/photos?page=1 where page=1 will return the first 12 photos.
    //This business rule to return each 12 was defined in the backend
    listFromUserPaginated(userName: string, page: number) {
        //add parameter page with its number
        const parameter = new HttpParams().append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params: parameter });
    }

    upload(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();//FormData because this form is using an upload
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        return this.http.post(API + '/photos/upload', formData);
    }
}
