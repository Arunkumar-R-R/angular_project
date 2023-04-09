import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';

type count_by_Status = {
      [key: string]: number;
}

@Component({
  selector: 'app-job-statistics',
  templateUrl: './job-statistics.component.html',
  styleUrls: ['./job-statistics.component.scss'],
})
export class JobStatisticsComponent {
  jobsData: any = {};
  statusArray = <any>[];
  count_by_status: count_by_Status = {};

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
      this.count_by_status[status] = 0;
      this.jobsData.jobs.map((job: any) => {
        if (job.status === status) {
          this.count_by_status[status] += 1;
        }
      });
    });
  }
}
