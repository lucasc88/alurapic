import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;//useful for uploads
  preview: string;//image preview

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this.photoService.upload(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));
  }

  //to covert the image, preview
  handleFile(file: File){
    this.file = file;
    const reader = new FileReader();

    //to use readAsDataURL() is necessary to attribute in reader.onload
    //this callback expression because target.result is the result for readAsDataURL()
    //any type because the target.result is a specific resource of FileReader, it's
    //just to run without issues.
    reader.onload = (event: any) => this.preview = event.target.result;

    //convert in Base64
    reader.readAsDataURL(file);
  }
}
