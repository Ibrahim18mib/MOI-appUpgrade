import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare global {
  interface Window {
    actions: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  number!: string;
  password!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.number = params['number'];
      this.password = params['password'];
    });
  }

  ///windows ACTION methods
  closeApp(): void {
    console.log('closing APP', window);
    window.actions.close();
  }
  maxApp(): void {
    console.log('maximize APP');
    window.actions.maximize();
  }
  minApp(): void {
    console.log('Minimising APP');
    window.actions.minimize();
  }
  appUpgrade(): void {
    console.log('Upgrade needed');
  }
}
