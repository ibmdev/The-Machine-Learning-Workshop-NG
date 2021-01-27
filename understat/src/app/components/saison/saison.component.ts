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
    formationModel: StatUiModel;
    // tslint:disable-next-line:max-line-length
    showStat = {attackSpeed : false, gameStat: false, timingStat: false, situationStat: false, shotzoneStat: false, resultStat: false, formationStat: false};
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
        this.gameStatModel = this.buildStatModelService.buildGameStatModel(homeStats[0], awayStats[0]);
        this.showStat.gameStat = true;
        this.timingModel = this.buildStatModelService.buildTimingStatModel(homeStats[0], awayStats[0]);
        this.showStat.timingStat = true;
        this.situationModel = this.buildStatModelService.buildSituationStatModel(homeStats[0], awayStats[0]);
        this.showStat.situationStat = true;
        this.shotZoneModel = this.buildStatModelService.buildShotzoneStatModel(homeStats[0], awayStats[0]);
        this.showStat.shotzoneStat = true;
        this.resultModel = this.buildStatModelService.buildResultStatModel(homeStats[0], awayStats[0]);
        this.showStat.resultStat = true;
        this.formationModel = this.buildStatModelService.buildFormationStatModel(homeStats[0], awayStats[0]);
        this.showStat.formationStat = true;
    }


}
