import { ScrumdataService } from './../scrumdata.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {

  projectId;
  participants = [];
  constructor(private route: ActivatedRoute, private scrumDataService: ScrumdataService) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.projectId = parseInt(this.route.snapshot.paramMap.get('project_id'));
    this.getProjectGoals();
  }

  getProjectGoals(){
    this.scrumDataService.allProjectGoals(this.projectId).subscribe(
      data => {
        this.participants = data.data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }

}
