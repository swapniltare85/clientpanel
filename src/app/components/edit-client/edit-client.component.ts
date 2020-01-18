import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
id:string;
client:Client={
  firstName:'',
  lastName:'',
  email:'',
  phone:'',
  balance:0
}
disableBalanceOnEdit:boolean;
  constructor(
    private clienrService:ClientService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit=this.settingsService.getSettings().disableBalanceOnEdit;
    //Get if from url
    this.id=this.route.snapshot.params['id'];
    //Get client
   
    this.clienrService.getClient(this.id).subscribe(client=>
      this.client=client);
  }
onSubmit({value, valid}:{value:Client,valid:boolean}){
  if(!valid){
  this.flashMessage.show('Please fill out form correctly',{
    cssClass:'alert-danger',timeout:4000
  });
  
  }else{
    //add id form url
    value.id=this.id; 
// updated the Client
this.clienrService.updateClient(value);
this.flashMessage.show('Client Updated ',{
  cssClass:'alert-success',timeout:4000
});
this.router.navigate(['/client/'+this.id]);
  }
}
 
}
