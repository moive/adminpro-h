import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BaseChartDirective } from 'ng2-charts';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphic1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BaseChartDirective,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphic1Component,
    PagesComponent,
  ],
})
export class PagesModule {}
