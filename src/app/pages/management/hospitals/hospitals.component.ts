import { Component, OnInit } from '@angular/core';

import { Hospital } from '@/app/models/hospital.model';
import { HospitalService } from '@/app/services';

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

  constructor(private hospitalService: HospitalService) {}
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

  saveHospitl(hospital: Hospital): void {
    this.editingHospital = this.editingHospital === hospital ? null : hospital;
  }
}
