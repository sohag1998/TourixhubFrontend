import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  fullName: string = ''
  email: string = ''
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.fullName = res.fullName
        this.email = res.email
        console.log(this.fullName)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  onLogout() {
    this.authService.signOut();
    this.router.navigateByUrl('/signin');
  }
}
