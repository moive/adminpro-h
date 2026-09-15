import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { Hospital } from '@/app/models/hospital.model';
import { AlertService, HospitalService } from '@/app/services';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.scss',
})
export class HospitalsComponent implements OnInit {
  public loading: boolean = true;
  public totalHospitals: number = 0;
  public hospitals: Hospital[] = [];
  public editingHospital: Hospital | null = null;
  public loadingHospitalId: string | null = null;

  constructor(
    private hospitalService: HospitalService,
    private alertService: AlertService,
  ) {}
  ngOnInit(): void {
    this.loadHospitals();
    console.log(this.loading);
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.totalHospitals = hospitals.length;
      this.loading = false;
    });
  }

  editHospital(hospital: Hospital): void {
    this.editingHospital = this.editingHospital === hospital ? null : hospital;
  }

  saveHospital(hospital: Hospital): void {
    console.log('saveHospital', hospital);
    const { _id, name } = hospital;
    this.loadingHospitalId = _id!;
    this.hospitalService
      .updateHospital(_id!, name)
      .pipe(
        finalize(() => {
          this.loadingHospitalId = null;
        }),
      )
      .subscribe({
        complete: () => {
          this.editingHospital = null;
          this.loadHospitals();
        },
      });
    this.editingHospital = this.editingHospital === hospital ? null : hospital;
  }

  deleteHospital(hospital: Hospital): void {
    const { _id } = hospital;
    const title = 'Delete Hospital';
    const text =
      'Are you sure you want to delete this hospital?<br>This action cannot be undone.';
    this.alertService.confirmDelete(title, text).then((confirmed) => {
      if (confirmed) {
        this.loadingHospitalId = _id!;
        this.hospitalService
          .deleteHospital(_id!)
          .pipe(finalize(() => (this.loadingHospitalId = null)))
          .subscribe({
            next: (res: any) => {
              this.alertService.success('Deleted!', res.msg);
            },
            error: (err) => {
              this.alertService.error('Error', err.error.msg);
            },
            complete: () => {
              this.loadHospitals();
            },
          });
      }
    });
  }

  async addHospital() {
    const name = await this.alertService.inputText(
      'Create Hospital',
      'Hospital name',
      'Enter hospital name',
    );

    if (!name) return;

    this.hospitalService.createHospital(name).subscribe({
      next: (res: any) => {
        this.alertService.success('Created!', res.msg);
      },
      error: (err) => {
        this.alertService.error('Error', err.error.msg);
      },
      complete: () => {
        this.loadHospitals();
      },
    });
  }
}
