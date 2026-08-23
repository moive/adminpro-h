import { Hospital } from '../models/hospital.model';

export interface LoadHospital {
  ok: boolean;
  hospitals: Hospital[];
}
