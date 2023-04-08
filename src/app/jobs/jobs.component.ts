import { BackendDataService } from './../backend-data.service';
import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit, OnDestroy {
  jobAttributes: string[] = ['id', 'job title', 'employee assigned', 'status'];
  selectOptionId: string[] = ['job_title', 'status'];
  status: string = '';
  jobsDataArray = <any>[];
  jobsData: any = {};
  currentRoute: String = '';
  urlSubcription: Subscription;
  dataSubscription: Subscription;
  currentUrl: string = '';
  showFilter: boolean = false;
  showFilterbutton:boolean = false;
  showFilterOptionButton: boolean = false;
  selectedFilter = 'Filter';
  selectOptionArray: string[] = [];
  selectedFilterOptionValue = undefined;

  constructor(
    private route: ActivatedRoute,
    private backendDataService: BackendDataService,
    private router: Router
  ) {
    this.dataSubscription = this.backendDataService.get().subscribe((data) => {
      this.jobsData = data;
      if (this.currentUrl === '/jobs') {
        this.renderJobsData();
      } else {
        this.renderStatusBasedData();
      }
    });
    this.urlSubcription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
      if (this.currentUrl === '/jobs') {
        this.showFilterbutton = true;
        setTimeout(() => {
          this.jobsDataArray = [];
          this.renderJobsData();
        }, 1000);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.status = params['status'];
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

  showFilterBox() {
    this.showFilter = true;
  }

  filterOption(event: any) {
    this.selectOptionArray = [];
    this.showFilter = false;
    this.showFilterOptionButton = true;
    let value = event.target.innerHTML;
    this.selectedFilter = value.trim();
    if (this.selectedFilter !== value) {
      this.jobsDataArray = [];
      this.renderJobsData();
      this.selectedFilterOptionValue = undefined;
    }
    const filterOptionId = this.selectedFilter;
    this.jobsData.jobs.map((job: any) => {
      if (job[filterOptionId]) {
        if (this.selectOptionArray.indexOf(job[filterOptionId]) < 0) {
          this.selectOptionArray.push(job[filterOptionId]);
        }
      }
    });
  }

  selectOption(event: any) {
    let selectedValue = event.target.value;
    this.jobsDataArray = [];
    this.jobsData.jobs.map((job: any) => {
      const trimmedValue = selectedValue.trim();
      if (Object.values(job).indexOf(trimmedValue) > -1) {
        this.jobsDataArray.push(job);
      }
    });
  }

  resetFilter() {
    this.showFilterOptionButton = false;
    this.selectedFilter = 'Filter';
    this.selectOptionArray = [];
    this.jobsDataArray = [];
    this.renderJobsData();
  }

  clickOutside() {
    this.showFilter = false;
  }

  ngOnDestroy(): void {
    this.urlSubcription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }
}
