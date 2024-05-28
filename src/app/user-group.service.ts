import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
  private apiUrl = 'http://localhost:5051/api/usergroup'; // Change this URL to match your API endpoint

  constructor(private http: HttpClient) { }

  getUserGroups(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
