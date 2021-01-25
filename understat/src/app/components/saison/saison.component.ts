import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StatUiModel } from 'src/app/models/stat-ui-model';
import { BuilderStatModelService } from 'src/app/services/builder-stat-model.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
    selector: 'app-saison',
    templateUrl: './saison.component.html',
    styleUrls: ['./saison.component.css'
    ],
     encapsulation: ViewEncapsulation.None,
  })
export class SaisonComponent implements OnInit {
    @Input() fixture: any;
    attackSpeedModel: StatUiModel;
    gameStatModel: StatUiModel;
    timingModel: StatUiModel;
    situationModel: StatUiModel;
    shotZoneModel: StatUiModel;
    resultModel: StatUiModel;
    showStat = {attackSpeed : false};
    constructor(private statService: StatService,
                private buildStatModelService: BuilderStatModelService) {}
    ngOnInit(): void {
        const homeTeam = this.statService.getTeamFromGroupStats(this.fixture.home.id);
        const awayTeam = this.statService.getTeamFromGroupStats(this.fixture.away.id);
    }
    afficherSaison() {
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
        console.log('home stats : ', homeStats);
        console.log('away stats : ', awayStats);
        this.attackSpeedModel = this.buildStatModelService.buildAttackSpeedModel(homeStats[0], awayStats[0]);
        this.showStat.attackSpeed = true;
    }


}
