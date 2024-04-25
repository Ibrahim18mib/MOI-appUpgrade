import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare global {
  interface Window {
    actions: any;
  }
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  number!: string;
  password!: string;

  counter: number = 0;

  isUpdate = false;
  isDownload = false;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    console.log('Constructor running');
  }

  ngAfterViewInit(): void {
    console.log('After view init hooked');

    this.updateCounter();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.number = params['number'];
      this.password = params['password'];
    });

    console.log('NG ONINTIT');
    //
  }

  //triggered update
  updateCounter() {
    console.log('into update function', window);

    window.actions.onUpdateCounter((getNumber: string) => {
      console.log('number getter', getNumber);
      this.counter += Number(getNumber);

      window.actions.setNum(this.counter);

      this.cdr.detectChanges();
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

  //handling callback
  handleUpgradeButtonClick() {
    console.log('Upgrade element clicked');
    window.actions.updateMessage();
  }
}
