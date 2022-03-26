import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  lon!: string | null;
  lat!: string | null;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.lon = this.route.snapshot.paramMap.get('lon');
    this.lat = this.route.snapshot.paramMap.get('lat');
  }

}
