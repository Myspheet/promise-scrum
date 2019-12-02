import { ScrumdataService } from './../scrumdata.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {

  projectId;
  participants = [];
  taskForTheDay = [];
  taskForTheWeek = [];
  taskVerified = [];
  taskDone = [];
  messages=[];
  myMessages = [];
  tasks = [{'hello': 'hi'},{'hello': 'hi'},{'hello': 'hi'}];
  loggedUser;
  submit = false;
  chatForm;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router:Router, private scrumDataService: ScrumdataService) {
    this.chatForm = this.formBuilder.group({
      chat: [null, Validators.required]
    });
   }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.loggedUser = this.scrumDataService.getUser();
    this.projectId = parseInt(this.route.snapshot.paramMap.get('project_id'));
    this.getProjectGoals();
    this.scrumDataService.myWebSocket.asObservable().subscribe(    
      msg => {
        new Promise(resolve => {
          resolve(msg);
        }).then(msg => {
        
          this.myMessages = [];
          this.myMessages.push(JSON.parse(JSON.stringify(msg)));
          this.myMessages.forEach(value => this.messages.push(JSON.parse(value)));
        });
       } , 
      // Called whenever there is a message from the server    
      err => console.log(err), 
      // Called if WebSocket API signals some kind of error    
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)  
   );
  }

  send() {
    this.submit = true;
    if ((this.submit && this.chatForm.untouched) || this.chatForm.invalid) {
      this.submit = false;
      return;
    }
    this.scrumDataService.myWebSocket.next({action:"sendmessage", data: {user:`${this.scrumDataService.getUser().name}`, data:`${this.chatForm.controls.chat.value}`}})
    this.chatForm.reset();
  }

  sortGoals( goal ) {
    switch ( goal.status ) {
       case 0: this.taskForTheWeek.push(goal);
               return;
       case 1: this.taskForTheDay.push(goal);
               return;
       case 2: this.taskVerified.push(goal);
               return;
       case 3: this.taskDone.push(goal);
               return;
       default: return;
    }
  }

  calculateRole(val){
    val = val.split("-");
    if((val[3] % 4) === 3 ){
      return 3;
    }
    if((val[3] % 4) === 2 ){
      return 2;
    }
    if((val[3] % 4) === 1 ){
      return 1;
    }
    if((val[3] % 4) === 0 ){
      return 0;
    }
  }

  updateGoalStatus( goal, goalItem ) {
    switch ( goal ) {
       case 0: goalItem.status = 0;
               return;
       case 2: goalItem.status = 1;
               return;
       case 2: goalItem.status = 2;
               return;
       case 3: goalItem.status = 3;
               return;
       default: return;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container);
      event.item.data.status = this.calculateRole(event.container.id);
      console.log('status' + event.item.data.status);
      this.scrumDataService.updateProject(event.item.data).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  filterTasks() {
    this.participants.forEach(( participant ) => {
      participant.scrumgoal_set.forEach(element => {
       this.sortGoals(element);
      });
    });
  }

  getProjectGoals() {
    this.scrumDataService.allProjectGoals(this.projectId).subscribe(
      data => {
        this.participants = data.data;
        this.filterTasks();
      },
      error => {
        console.log(error);
      }

    )
  }

  logout() {
    if(this.scrumDataService.logout()){
      this.router.navigate(['/login']);
    }else{
      console.log('error');
    }
  }

}
