import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public users:any = [];





  constructor(private api:ApiService , private auth:AuthService , private observer: BreakpointObserver ) { }

  ngOnInit(): void {
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    })
  }






  ngAfterViewInit() {


    this.observer.observe(['(max-width:800px)']).subscribe((res)=>{

    if(res.matches){
      this.sidenav.mode='over';
      this.sidenav.close();
    }else{
      this.sidenav.mode='side';
      this.sidenav.open();
    }



    })





      }











logout(){
this.auth.signOut();
}




}
