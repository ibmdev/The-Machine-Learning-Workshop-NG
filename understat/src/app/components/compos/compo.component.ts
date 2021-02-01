import { templateJitUrl } from '@angular/compiler';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DataTableCellEvent, DataTableParams, DataTableResource, DataTableRowEvent } from 'ngx-datatable-bootstrap4';
import { StatService } from 'src/app/services/stat.service';

@Component({
    selector: 'app-compo',
    templateUrl: './compo.component.html',
    styleUrls: ['./compo.component.scss'
    ],
     encapsulation: ViewEncapsulation.None,
  })
export class CompoComponent implements OnInit {
    @Input() fixture: any;
    itemHomeResource: DataTableResource<any>;
    itemAwayResource: DataTableResource<any>;
    itemsHome: any[] = [];
    itemsAway: any[] = [];
    itemCountHome = 0;
    itemCountAway = 0;
    isVisibleHome = false;
    isVisibleAway = false;
    hometeam = '';
    awayteam = '';
    homeTotal = {player_name : 'Total', goals: 0, xG: 0, assists : 0, xA: 0, shots : 0, yellow_cards : 0, red_cards: 0, time : 0 };
    homeTotalSelected = [];
    awayTotal = {player_name : 'Total', goals: 0, xG: 0, assists : 0, xA: 0, shots : 0, yellow_cards : 0, red_cards: 0, time : 0 };
    awayTotalSelected = [];
    constructor(private statService: StatService) {}
    ngOnInit(): void {}
    afficherComposition() {
        const homeStats = this.statService.groupStats.filter((data) => {
            if (data.Team === this.fixture.home.Team) {
                return data;
            }
          });
        this.hometeam = homeStats[0].Team;
        const awayStats = this.statService.groupStats.filter((data) => {
            if (data.Team === this.fixture.away.Team) {
                return data;
            }
          });
        this.awayteam = awayStats[0].Team;
        const homePlayersJSON = homeStats[0].players;
        homePlayersJSON.forEach(player => {
          player.xG = Number(player.xG).toFixed(2);
          player.xA = Number(player.xA).toFixed(2);
        });
        homePlayersJSON.push(this.homeTotal);
        this.itemHomeResource = new DataTableResource(homePlayersJSON);
        const awayPlayersJSON = awayStats[0].players;
        awayPlayersJSON.forEach(player => {
          player.xG = Number(player.xG).toFixed(2);
          player.xA = Number(player.xA).toFixed(2);
        });
        awayPlayersJSON.push(this.awayTotal);
        this.itemAwayResource = new DataTableResource(awayPlayersJSON);
        this.itemHomeResource.count()
        .then(count => this.itemCountHome = count)
        .then(() => {
            this.isVisibleHome = true;
        });
        this.itemAwayResource.count()
        .then(count => this.itemCountAway = count)
        .then(() => {
            this.isVisibleAway = true;
        });
    }
    reloadItemsHome(params: DataTableParams): void {
        this.itemHomeResource.query(params).then(items => this.itemsHome = items);
      }
    reloadItemsAway(params: DataTableParams): void {
        this.itemAwayResource.query(params).then(items => this.itemsAway = items);
    }
    rowClickHome(item: any): void {
        this.homeTotalSelected.push(item);
        item.selected = true;
        this.updateHomeTotal();
      }
      rowDeleteHome(item: any) {
        item.selected = false;
        this.homeTotalSelected = this.homeTotalSelected.filter(e => e.player_name !== item.player_name);
        this.updateHomeTotal();
      }
      updateHomeTotal() {
        let goals = 0;
        let xG = 0;
        let assists = 0;
        let xA = 0;
        let shots = 0;
        let yellowCards = 0;
        let redCards = 0;
        let time = 0;
        this.homeTotalSelected.forEach(itemTmp => {
            goals = Number(goals) + Number(itemTmp.goals);
            xG = Number(xG) + Number(itemTmp.xG);
            assists = Number(assists) + Number(itemTmp.assists);
            xA = Number(xA) + Number(itemTmp.xA);
            shots = Number(shots) + Number(itemTmp.shots);
            yellowCards = Number(yellowCards) + Number(itemTmp.yellow_cards);
            redCards = Number(redCards) + Number(itemTmp.red_cards);
            time = Number(time) + Number(itemTmp.time);
        });
        this.homeTotal.goals = goals;
        this.homeTotal.xG = Number(xG.toFixed(2));
        this.homeTotal.assists = assists;
        this.homeTotal.xA = Number(xA.toFixed(2));
        this.homeTotal.shots = shots;
        this.homeTotal.yellow_cards = yellowCards;
        this.homeTotal.red_cards = redCards;
        this.homeTotal.time = time;
      }
      rowClickAway(item: any): void {
        this.awayTotalSelected.push(item);
        item.selected = true;
        this.updateAwayTotal();
      }
      rowDeleteAway(item: any) {
        item.selected = false;
        this.awayTotalSelected = this.awayTotalSelected.filter(e => e.player_name !== item.player_name);
        this.updateAwayTotal();
      }
      updateAwayTotal() {
        let goals = 0;
        let xG = 0;
        let assists = 0;
        let xA = 0;
        let shots = 0;
        let yellowCards = 0;
        let redCards = 0;
        let time = 0;
        this.awayTotalSelected.forEach(itemTmp => {
            goals = Number(goals) + Number(itemTmp.goals);
            xG = Number(xG) + Number(itemTmp.xG);
            assists = Number(assists) + Number(itemTmp.assists);
            xA = Number(xA) + Number(itemTmp.xA);
            shots = Number(shots) + Number(itemTmp.shots);
            yellowCards = Number(yellowCards) + Number(itemTmp.yellow_cards);
            redCards = Number(redCards) + Number(itemTmp.red_cards);
            time = Number(time) + Number(itemTmp.time);
        });
        this.awayTotal.goals = goals;
        this.awayTotal.xG = Number(xG.toFixed(2));
        this.awayTotal.assists = assists;
        this.awayTotal.xA = Number(xA.toFixed(2));
        this.awayTotal.shots = shots;
        this.awayTotal.yellow_cards = yellowCards;
        this.awayTotal.red_cards = redCards;
        this.awayTotal.time = time;
      }
}
