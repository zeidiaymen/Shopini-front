import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/userService/user.service';
import { FactStatsService } from '../Service/fact-stats.service';
declare var google:any ;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clientVerified=0;
  clientNotVerified=0;    
  fournisseurNotVerified=0;
  fournisseurVerified=0;
  livreurVerified=0;
  livreurNotVerified=0;
  constructor(private serv:FactStatsService,private userService : UserService) { 

  
    this.serv.getDelivery().subscribe(e=> { 
      console.log(e)
          e.forEach(x=> {
            if ( x.address == "TUNISIE")
            {this .tun ++  ; 
            console.log(this.tun);
            }
            else  if (x.address == "MAROC")
            {this .ma ++ ;
              console.log ('maroc' + this.ma)
            }
            else  if (x.address == "LIBYE")
            {this .lb ++ ;
            }
            else  if (x.address == "FRANCE")
            { 
            this .fr ++ ;
            }else if (x.address="ALGERIE")
            {this.al ++ ;
            }var t = new Date (x.estimatedTime);
            console.log(t.getMonth())
            if (t.getMonth() == 11)
            {
              if (x.status == "expired")
          this.Enov +=100;
            
            else 
            this. Tnov +=100; 
            }
            else     if (t.getMonth() == 12)
            {
              if (x.status == "expired")
          this.Esep +=100;
            
            else 
            this. Tsep +=100; 
            }
            else     if (t.getMonth() == 12)
            {
              if (x.status == "expired")
          this.Edec +=100;
            
            else 
            this. Tdec +=100; 
            }
            else 
            {
              if (x.status == "expired")
              this.Ejan +=100;
                
                else 
                this. Tjan +=100; 
                }
            }
          
          )
          this.drawChart();
          })
      
      

  }
  
  @ViewChild('pieChart') pieChart!: ElementRef;
  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('pieChartUser') pieChartUser!: ElementRef;

  tun=0 ;
  fr =0 ;
  al =0 ;
  lb =0 ;
  ma =0 ;
  
    Tsep = 1000 ;
    Esep = 1000 ;
    Tnov = 1000 ;
    Enov = 1000 ;
    Tdec = 1000 ;
    Edec = 1000 ;
    Tjan = 1000 ;
    Ejan = 1000 ;
  
  
  

  
  
   
  
    ngOnInit(): void {
      this.userService.getUsers().subscribe(data=>{
        console.log(data);
        
        

        data.forEach(user=>{
          console.log(user);
          if(user.accountStatus=='VERIFIED'&&user.role=='CLIENT')
          this.clientVerified++;
         else if(user.accountStatus=='VERIFIED'&&user.role=='FOURNISSEUR')
          this.fournisseurVerified++;
          else if(user.accountStatus=='VERIFIED'&&user.role=='LIVREUR')
          this.livreurVerified++;
          else if(user.accountStatus=='NOT_VERIFIED'&&user.role=='CLIENT')
          this.clientNotVerified++;
          else if(user.accountStatus=='NOT_VERIFIED'&&user.role=='FOURNISSEUR')
          this.fournisseurNotVerified++;
          else if(user.accountStatus=='NOT_VERIFIED'&&user.role=='LIVREUR')
          this.livreurNotVerified++;
        })
        
      });
    
    }
  
    ngAfterViewInit(): void {
      google.charts.load('current', {packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart);
      google.charts.load('current', {packages: ['corechart', 'line']});
      google.charts.setOnLoadCallback(this.drawChart);
    }
    drawChart ()
    {
      console.log('TUNISIE ' + this.tun)
      
          const data = google.visualization.arrayToDataTable([
            ['Deliveries', 'Deliveries by country'],
            ['Tunisie', this.tun ],
            ['France', this.fr],
            ['Algerie', this.al],
            ['Libye', this.lb],
            ['Maroc', this.ma]
          ]);
          
          
          const datas = google.visualization.arrayToDataTable([
            ['Month', 'Taken', 'Expired'],
            ['October',  this.Tsep,      this.Esep],
            ['November',  this.Tnov,      this.Enov],
            ['December', this.Tdec,       this.Edec],
            ['January',  this.Tjan,      this.Ejan]
          ]);
    
          const dataUser = google.visualization.arrayToDataTable([
            ['Month', 'Verified', 'Not Verified'],
            ['Client',  this.clientVerified,      this.clientNotVerified],
            ['Livreur',  this.livreurVerified,      this.livreurNotVerified],
            ['Fournisseur', this.fournisseurVerified,this.fournisseurNotVerified]
            
          ]);
      
      
      
          const options = {
            title: 'distribution of deliveries by country',
            legend: {position: 'top'}
      
      
          };
          const options1 = {
            title: 'Status of deliveries by month',
            curveType: 'function',
            legend: { position: 'bottom' }
          };
    
          const optionUser = {
            title: 'Status of User by role',
            curveType: 'function',
            legend: { position: 'bottom' }
          };
      
      
          const chart = new google.visualization.PieChart(this.pieChart.nativeElement);
      
          const charts = new google.visualization.LineChart(this.lineChart.nativeElement);
    
          const chartsUser = new google.visualization.ColumnChart(this.pieChartUser.nativeElement);
    
          chart.draw(data, options);
          charts.draw(datas, options1);
          chartsUser.draw(dataUser, optionUser);
    
      
        }
}
