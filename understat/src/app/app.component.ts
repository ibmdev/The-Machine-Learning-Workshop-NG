import { Component, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../app/lib/http.service';
import { MatService } from '../app/lib/mat.service';
import { setTheme } from 'ngx-bootstrap/utils';
import * as moment from 'moment';
import { StatService } from './services/stat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
   '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
   '../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css'
  ],
   encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  config = {
    displayKey: 'name',
    search: false,
    limitTo: 10,
  };
  /* Modèle de données */
  dateStart: any;
  dateEnd: any;
  minDate: Date;
  understatData: [];
  /*Liste des noms des leagues */
  leaguesName: string[] = [];
  /* Liste des fixtures */
  groupFixtures: [];
  groupFixturesDisplay: any[];
  /* Liste des statistiques générales de la league */
  groupStats: any[];
  groupStatsDisplay = new Map();
  constructor(private httpService: HttpService,
              private matService: MatService,
              private statService: StatService) {
    this.minDate = new Date();
    this.dateStart = new Date();
    setTheme('bs4');
    this.httpService.getDataHttp('assets/data.json').subscribe((data) => {
     this.statService.understatData =  this.understatData = data;
     this.statService.leaguesName = this.leaguesName = this.matService.buildSelectModel(data);
    });
  }
  /* Listen changement de league */
  changeLeague($event) {
    const infoLeague = this.getDataByLeague($event.value.name);
    this.statService.groupFixtures = this.groupFixtures = infoLeague.fixtures;
    this.groupFixturesDisplay = this.statService.groupFixtures;
    this.statService.groupStats = this.groupStats = infoLeague.stats;
  }
  /* get informations by league */
  getDataByLeague(league: string): any {
    return this.statService.understatData.filter((l: any) => l.name === league)[0];
  }
   /* Formattage de date */
   formatDate(value: Date): any {
    return moment(value).format('YYYY-MM-DD 00:00:00');
   }
   /* Filtres les matchs fixtures par date */
  filter() {
    const start = this.formatDate(this.dateStart);
    const end = this.formatDate(this.dateEnd);
    if (this.statService.groupFixtures && this.statService.groupFixtures.length > 0) {
      this.groupFixturesDisplay = this.statService.groupFixtures.filter(
        (fixture: any) =>
        moment(fixture.date, 'YYYY-MM-DD 00:00:00').isSameOrAfter(start) &&
        moment(fixture.date, 'YYYY-MM-DD 00:00:00').isSameOrBefore(end)
        );
      }
    }
}
