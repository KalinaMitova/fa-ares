import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component( {
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [ './nav-bar.component.css' ]
} )
export class NavBarComponent {

  private isLoggedIn: boolean = true;
  private username: string = "kalina"

  isHandset$: Observable<boolean> = this.breakpointObserver.observe( Breakpoints.Handset )
    .pipe(
      map( result => result.matches )
    );

  constructor ( private breakpointObserver: BreakpointObserver ) { }

  logout() {

  }

}
