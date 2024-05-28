import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  userName: string = '';
  score: number = 0;
  rank: number = 0;

  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName')!;
    this.fetchSummary();
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as { userName: string };
    // console.log("Test1");
    // if (state) {
    //   this.userName = state.userName;
    //   this.fetchSummary();
    // }
  }

  fetchSummary(): void {
    this.http.get<any>(`http://localhost:5051/api/summary/${this.userName}`).subscribe(
      data => {
        this.userName = data.userName;
        this.score = data.score;
        this.rank = data.rank;
      },
      error => {
        console.error('Failed to fetch summary', error);
      }
    );
  }
}
