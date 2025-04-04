import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { AddPostDto } from '../../../../models/post.model';
import { PostService } from '../../../../shared/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  imports: [FormsModule, CommonModule],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent {
  images: { url: string }[] = [];

  postData: AddPostDto = {
    Content: null,
    Images: null
  };

  constructor(private postService: PostService, private router: Router) {

  }

  onSubmit(): void {
    if (this.postData.Content || this.postData.Images?.length) {
      this.postService.addPost(this.postData).subscribe({
        next: res => {
          console.log(res);
          this.postData.Content = null
          this.postData.Images = null
          this.router.navigateByUrl('/');

        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;

    if (files.length) {
      this.postData.Images = Array.from(files);

    }
    if (this.postData.Images) {
      this.postData.Images.forEach(image => {
        //  const Imgurl = URL.createObjectURL(image)
        this.images.push({ url: URL.createObjectURL(image) })
      })
    }
  }


}
