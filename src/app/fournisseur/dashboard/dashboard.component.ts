import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product/service/product.service";
declare var google:any ;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('pieChart') pieChart!: ElementRef;

  E=0;
  A=0;
  Q=0;

  drawChart = () => {

    const data = google.visualization.arrayToDataTable([
      ['Categories', 'Products by Category'],
      ['Electromenager', this.E.valueOf() ],
      ['Quincaillerie', this.Q.valueOf() ],
      ['Alimentaire', this.A.valueOf() ]
    ]);

    const options = {
      title: 'distribution of products by category',
      legend: {position: 'top'}


    };

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);

  }

  constructor(private productService:ProductService) { }

  stats !: any;
  ngOnInit(): void {
    this.productService.stats().subscribe((d)=>{
      //console.log(d);
      this.stats=d;
      this.E=this.stats.Electromenager?? 0;
      this.Q=this.stats.Quincaillerie?? 0;
      this.A=this.stats.Alimentaire?? 0;
    })

  }


  ngAfterViewInit(): void {
    google.charts.load('current', {packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);

  }

}
