import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StatService } from 'src/app/services/stat.service';
import * as HighCharts from 'highcharts';
import { StatUiModel } from 'src/app/models/stat-ui-model';
import { BuilderStatModelService } from 'src/app/services/builder-stat-model.service';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.css'
    ],
     encapsulation: ViewEncapsulation.None,
  })
export class ResumeComponent implements OnInit {
    @Input() fixture: any;
    moyenneButsModel: StatUiModel;
    butsMatchModel: StatUiModel;
    scoreFinalModel: StatUiModel;
    moyenneMatchModel: StatUiModel;
    showStat = {moyenneButs : false, butsMatch: false, scoreFinal: false, moyenneMatch: false};
    constructor(private statService: StatService,
                private buildStatModelService: BuilderStatModelService) {}
    ngOnInit(): void {
        const homeTeam = this.statService.getTeamFromGroupStats(this.fixture.home.id);
        const awayTeam = this.statService.getTeamFromGroupStats(this.fixture.away.id);
  }
  afficherResume() {
    const homeStats = this.statService.groupStats.filter((data) => {
      if (data.Team === this.fixture.home.Team) {
          return data;
      }
    });
    const awayStats = this.statService.groupStats.filter((data) => {
      if (data.Team === this.fixture.away.Team) {
          return data;
      }
    });
    this.moyenneButsModel = this.buildStatModelService.buildMoyButModel(homeStats[0], awayStats[0]);
    this.showStat.moyenneButs = true;
    this.butsMatchModel = this.buildStatModelService.buildButMatchModel(homeStats[0], awayStats[0]);
    this.showStat.butsMatch = true;
    this.scoreFinalModel = this.buildStatModelService.buildScoreFinalModel(homeStats[0], awayStats[0]);
    this.showStat.scoreFinal = true;
    this.moyenneMatchModel = this.buildStatModelService.buildMoyenneMatchModel(homeStats[0], awayStats[0]);
    this.showStat.moyenneMatch = true;
    // this.buildBaseLine();
    // this.barChartPopulation();
  }
    /* Liste des graphiques */
    /* BaseLine */
    buildBaseLine() {

        HighCharts.chart('baseline' + this.fixture.home.id + '' + this.fixture.away.id, {
            chart: {
              type: 'line'
            },
            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },
            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2017'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                type: undefined,
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                type: undefined,
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                type: undefined,
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                type: undefined,
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                type: undefined,
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
          });
    }
    barChartPopulation() {
        HighCharts.chart('barChart' + this.fixture.home.id, {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Historic World Population by Region'
          },
          xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Population (millions)',
              align: 'high'
            },
          },
          tooltip: {
            valueSuffix: ' millions'
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true
              }
            }
          },
          series: [{
            type: undefined,
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
          }, {
            type: undefined,
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
          }, {
            type: undefined,
            name: 'Year 2000',
            data: [814, 841, 3714, 727, 31]
          }, {
            type: undefined,
            name: 'Year 2016',
            data: [1216, 1001, 4436, 738, 40]
          }]
        });
      }
}
