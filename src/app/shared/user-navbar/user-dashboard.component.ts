import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare global {
  interface Window {
    actions: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      updateMessage: () => Promise<void>;
    };
  }
}

// Define the types for DOM elements
interface HTMLElements {
  upgradeButton: HTMLButtonElement;
}

// Access DOM elements
const elements: HTMLElements = {
  upgradeButton: document.getElementById('btnUpgrade') as HTMLButtonElement,
};

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  number!: string;
  password!: string;

  constructor(
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    console.log('Constructor running');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.number = params['number'];
      this.password = params['password'];
    });

    console.log('NG ONINTIT');
    //
    const upgradeButton = this.elRef.nativeElement.querySelector('#btnUpgrade');

    // Check if upgradeButton element exists
    if (upgradeButton) {
      // Add event listener to the button
      this.renderer.listen(
        upgradeButton,
        'click',
        this.handleUpgradeButtonClick
      );
    } else {
      console.error('Upgrade button element not found.');
    }
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

  //handling callback
  handleUpgradeButtonClick() {
    console.log('Upgrade element clicked', window);
    window.actions.updateMessage()
    .then(() => {
      console.log("Masseage updated successfully...");
    })
    .catch((error) => {
      console.error('An error occurred while updating the message:', error);
    });
  }
}
