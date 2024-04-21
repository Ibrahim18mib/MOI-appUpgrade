import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare global {
  interface Window {
    actions: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      updateMessage: (callback: () => void) => void;
    };
  }
}

//handle message
declare global {
  interface Window {
    handleMessage: (message: string) => void;
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

  constructor(private route: ActivatedRoute) {
    // Call the handleMessage function when a message is received
    window.handleMessage = (message: string) => {
      console.log('Message from main process:', message);
    };
  }

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
    console.log('maximize APP', window);
    window.actions.maximize();
  }
  minApp(): void {
    console.log('Minimising APP');
    window.actions.minimize();
  }
  appUpgrade() {
    // Pass a callback function to updateMessage
  window.actions.updateMessage(() => {
    console.log('Update message callback executed');
    // You can add any additional logic inside this callback function
  });
    
  }
}
