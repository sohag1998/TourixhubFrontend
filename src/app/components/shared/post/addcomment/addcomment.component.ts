import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../../shared/services/post.service';

@Component({
  selector: 'app-addcomment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addcomment.component.html',
  styleUrl: './addcomment.component.css'
})
export class AddcommentComponent implements OnInit {
  @Input() post: any;
  commentForm!: FormGroup

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService
  ) { }
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      postId: ['', Validators.required],
      content: ['', Validators.required]
    });

    if (this.post) {
      this.commentForm.patchValue({ postId: this.post.id });
    }
  }



  onSubmit() {
    this.isSubmitted = true;
    if (this.commentForm.valid) {
      this.postService.addComment(this.commentForm.value).subscribe({
        next: (res: any) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
      this.isSubmitted = false;
      this.commentForm.reset();

      if (this.post) {
        this.commentForm.patchValue({ postId: this.post.id });
      }
    }
  }
  hasDisplaybaleError(controlName: string): Boolean {
    const control = this.commentForm.get(controlName);
    return (Boolean(control?.invalid) && Boolean(this.isSubmitted || control?.dirty));
  }
}
