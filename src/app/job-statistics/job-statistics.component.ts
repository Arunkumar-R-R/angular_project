import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';

type userDetails = {
  name: string[];
  count: number;
};

type desiredOutput = {
  count_by_status: {
    [key: string]: number;
  };
  count_by_user: userDetails[];
};

@Component({
  selector: 'app-job-statistics',
  templateUrl: './job-statistics.component.html',
  styleUrls: ['./job-statistics.component.scss'],
})
export class JobStatisticsComponent {
  jobsData: any = {};
  statusArray = <any>[];
  desiredOutput: desiredOutput = {
    count_by_status: {},
    count_by_user: [],
  };

  constructor(private backendDataService: BackendDataService) {}

  ngOnInit() {
    this.backendDataService.get().subscribe((response: any) => {
      this.jobsData = response;
      this.getStatusArray();
    });
  }

  getStatusArray() {
    this.jobsData.jobs.map((job: any) => {
      if (job.status) {
        if (this.statusArray.indexOf(job.status) < 0) {
          this.statusArray.push(job.status);
        }
      }
    });
    this.statusArray.map((status: string) => {
      this.desiredOutput.count_by_status[status] = 0;
      this.jobsData.jobs.map((job: any) => {
        if (job.status === status) {
          this.desiredOutput.count_by_status[status] += 1;
        }
      });
    });
    console.log(this.desiredOutput, 'desired output');
  }
}
