import { BackendDataService } from './../backend-data.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  displayedColumns: string[] = [
    'id',
    'job title',
    'employee assigned',
    'status',
  ];
  status: string = '';
  jobsDataArray = <any>[];
  jobsData: any = {};
  currentRoute: String = '';
  urlSubcription: Subscription;
  currentUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private backendDataService: BackendDataService,
    private router: Router
  ) {
    this.urlSubcription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
      if (this.currentUrl === '/jobs') {
         this.jobsDataArray = [];
         this.renderJobsData();
       }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.status = params['status'];
    });
    this.backendDataService.get().subscribe((data) => {
      this.jobsData = data;
      if (this.currentUrl === '/jobs') {
        this.renderJobsData();
      } else {
        this.renderStatusBasedData();
      }
    });
  }

  renderStatusBasedData() {
    this.jobsData.jobs.map((job: any) => {
      if (job.status === this.status) {
        this.jobsDataArray.push(job);
      }
    });
  }

  renderJobsData() {
    this.jobsData.jobs.map((job: any) => {
      this.jobsDataArray.push(job);
    });
  }

  ngOnDestroy(): void {
    this.urlSubcription.unsubscribe();
  }
}
