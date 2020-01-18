import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
id:string;
client:Client;
hasBalance:boolean=false;
showBalanceUpdateInput:boolean=false;
  constructor(
    private clienrService:ClientService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    //Get id from
    this.id=this.route.snapshot .params['id'];
    //Get client
    this.clienrService.getClient(this.id).subscribe(client=>{
      if(client!=null){
        if(client.balance>0){
          this.hasBalance=true;
        }
      }
      this.client=client;
      
    });
  }
  updateBalance(){
    this.clienrService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', {
      cssClass: 'alert-success',timeout:4000
    });
    
  }
  onDeleteClick(){
    if(confirm('Are you Sure?')){
      this.clienrService.deleteClient(this.client);
      this.flashMessage.show('Client Removed', {
        cssClass: 'alert-success',timeout:4000
      });
      this.router.navigate(['/']);
    }
  }

}
