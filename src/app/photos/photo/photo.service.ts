import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Photo } from "./photo";
import { PhotoComment } from "./photo-comment";
import { environment } from "../../../environments/environment";

const API = environment.ApiUrl;

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
        formData.append('allowComments', allowComments ? 'true' : 'false');//only string is accept, no booleans
        formData.append('imageFile', file);
        return this.http.post(API + '/photos/upload', formData);
    }

    findById(id: number) {
        return this.http.get<Photo>(API + '/photos/' + id);
    }

    getComments(id: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' + id + '/comments');
    }

    addComment(id: number, commentText: string) {
        return this.http
            .post(API + '/photos/' + id + '/comments',
                { commentText: commentText });//attribute and its value
    }

    removePhoto(id: number) {
        return this.http
            .delete(API + '/photos/' + id);
    }

    //This method will return a boolean type of Observable
    //True is Success
    //False is Error (304 is an error that means the user already liked that photo)
    //Any other Error will be throw above
    like(id: number) {
        return this.http
            .post(API + '/photos/' + id + '/like', {},//{} every POST has a body, in this case it's a empty body
                { observe: 'response' })//observe is to access all the content in the response(status, header, etc)

            .pipe(map(res => true))//if the return is success, returns true and nothing happens

            .pipe(catchError(err => {//catchError is to do an error handling
                //if the return is 304, it means the user already liked that photo
                //in error case, retuns an Oberservable false or throw the error
                //of() returns an Observable of false
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }
}
