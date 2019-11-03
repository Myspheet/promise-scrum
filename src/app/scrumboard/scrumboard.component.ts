import { ScrumdataService } from './../scrumdata.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  tasks = [{'hello': 'hi'},{'hello': 'hi'},{'hello': 'hi'}];
  loggedUser;

  constructor(private route: ActivatedRoute, private scrumDataService: ScrumdataService) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.loggedUser = this.scrumDataService.getUser();
    this.projectId = parseInt(this.route.snapshot.paramMap.get('project_id'));
    this.getProjectGoals();
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
    console.log('working');
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
        console.log(this.participants);
      },
      error => {
        console.log(error);
      }

    )
  }

}
