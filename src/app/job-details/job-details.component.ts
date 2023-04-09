import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent {
  jobsData: any = {};
  primaryJobData = <any>{};
  jobsId:number = NaN;

  constructor(
    private backendDataService: BackendDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.jobsId = parseInt(params['id']);
    });
    this.backendDataService.get().subscribe((data) => {
      this.jobsData = data;
      this.renderJobsData();
    });
  }
  renderJobsData() {
    this.jobsData.jobs.map((job: any) => {
      if (job.job_id === this.jobsId) {
        this.primaryJobData = job;
      }
    });
  }

}
