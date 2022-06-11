import { Pipe, PipeTransform } from "@angular/core";
import { Photo } from "../photo/photo";

//Pipes can generate transformations in the data.
//In this case, if the user types something, the photos will be filtered.
@Pipe({
    name: 'filterByDescription'
})
export class FilterByDescription implements PipeTransform {

    //it gets the photo array and what the user wrote
    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery.trim().toLocaleLowerCase();

        if (descriptionQuery) {//if there is something written, filter it
            return photos.filter(
                photo => photo.description.toLocaleLowerCase().includes(descriptionQuery));
        } else {
            return photos;
        }
    }
}