import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { JobStatisticsComponent } from './job-statistics/job-statistics.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SideNavigationComponent,
    HeaderNavigationComponent,
    MainComponentComponent,
    JobStatisticsComponent,
    JobsComponent,
    JobDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
