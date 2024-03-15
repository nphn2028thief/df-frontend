export interface ILicense {
  license_type: string;
  libraries: string[];
}

export interface IResult {
  project_name: string;
  project_domain: string;
  last_accessed: string | null;
  license_use: ILicense[];
}

export interface IProjectResponse {
  count: number;
  results: IResult[];
}
