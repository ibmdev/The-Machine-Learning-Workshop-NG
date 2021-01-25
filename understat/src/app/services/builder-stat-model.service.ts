import { Injectable } from '@angular/core';
import { BUTS_MATCH, SCORE_FINAL, MOYENNE_STATS } from '../enums/groups.enum';
import { Libelles } from '../enums/libelles.enum';
import { MoyenneBut, ButMatch, ScoreFinal, AttackSpeedStat } from '../enums/options.enum';
import { TranslateService } from '../lib/translate.service';
import { LevelModel } from '../models/level-model';
import { StatUiModel } from '../models/stat-ui-model';
import { ValueModel } from '../models/value-model';

@Injectable({
    providedIn: 'root',
})
export class BuilderStatModelService {
    constructor(private translateService: TranslateService) {}
    buildMoyButModel(homeStats: any, awayStats: any): StatUiModel {
        const model: StatUiModel = new StatUiModel();
        model.headerTitle = Libelles.MOY_BUT;
        model.options = this.translateService.convertEnumToOption(MoyenneBut);
        model.optionSelectedDefault = MoyenneBut.Marqués;
        /* Level */
        const level: LevelModel = new LevelModel();
        level.titre = '';
        level.values = [];
        const valueM: ValueModel = new ValueModel();
        valueM.key = MoyenneBut.Marqués;
        const homeM: number = homeStats.GF / homeStats.M;
        valueM.oneValue = homeM.toFixed(2).toString();
        const awayM: number = awayStats.GF / awayStats.M;
        valueM.twoValue = awayM.toFixed(2).toString();
        const valueC: ValueModel = new ValueModel();
        valueC.key = MoyenneBut.Concédés;
        const homeC: number = homeStats.GA / homeStats.M;
        valueC.oneValue = homeC.toFixed(2).toString();
        const awayC: number = awayStats.GA / awayStats.M;
        valueC.twoValue = awayC.toFixed(2).toString();
        level.values.push(valueM);
        level.values.push(valueC);
        model.levels = [];
        model.levels.push(level);
        return model;
    }
    /* RESUME */
    buildButMatchModel(homeStats: any, awayStats: any) {
        const homeResults: [] = homeStats.results;
        const awayResults: [] = awayStats.results;
        const model: StatUiModel = new StatUiModel();
        model.headerTitle = Libelles.BUT_MATCH;
        model.options = this.translateService.convertEnumToOption(ButMatch);
        model.optionSelectedDefault = ButMatch.Marqués;
        model.levels = [];
        /* Level */
        const level: LevelModel = new LevelModel();
        level.titre = '';
        level.values = [];
        level.values = this.getButMatchModel(level.values, homeResults, awayResults, ButMatch.Marqués);
        level.values = this.getButMatchModel(level.values, homeResults, awayResults, ButMatch.Concédés);
        level.values = this.getButMatchModel(level.values, homeResults, awayResults, ButMatch.Total);
        /* MODELS */
        model.levels.push(level);
        return model;
    }
    buildScoreFinalModel(homeStats: any, awayStats: any) {
      const homeResults: [] = homeStats.results;
      const awayResults: [] = awayStats.results;
      const model: StatUiModel = new StatUiModel();
      model.headerTitle = Libelles.SCORE_FINAL;
      model.options = this.translateService.convertEnumToOption(ScoreFinal);
      model.optionSelectedDefault = ScoreFinal['Gagne à la mi-temps'];
      model.levels = [];
      const level: LevelModel = new LevelModel();
      level.titre = '';
      level.values = [];
      /* Gagne à la mi-temps */
      const valueWW: ValueModel = new ValueModel('0', '0');
      valueWW.key = ScoreFinal['Gagne à la mi-temps'];
      valueWW.group = SCORE_FINAL.VICTOIRE;
      const valueWD: ValueModel = new ValueModel('0', '0');
      valueWD.key = ScoreFinal['Gagne à la mi-temps'];
      valueWD.group = SCORE_FINAL.NUL;
      const valueWL: ValueModel = new ValueModel('0', '0');
      valueWL.key = ScoreFinal['Gagne à la mi-temps'];
      valueWL.group = SCORE_FINAL.DEFAITE;
      /* Nul à la mi-temps */
      const valueDW: ValueModel = new ValueModel('0', '0');
      valueDW.key = ScoreFinal['Nul à la mi-temps'];
      valueDW.group = SCORE_FINAL.VICTOIRE;
      const valueDD: ValueModel = new ValueModel('0', '0');
      valueDD.key = ScoreFinal['Nul à la mi-temps'];
      valueDD.group = SCORE_FINAL.NUL;
      const valueDL: ValueModel = new ValueModel('0', '0');
      valueDL.key = ScoreFinal['Nul à la mi-temps'];
      valueDL.group = SCORE_FINAL.DEFAITE;
      /* Défaite à la mi-temps */
      const valueLW: ValueModel = new ValueModel('0', '0');
      valueLW.key = ScoreFinal['Défaite à la mi-temps'];
      valueLW.group = SCORE_FINAL.VICTOIRE;
      const valueLD: ValueModel = new ValueModel('0', '0');
      valueLD.key = ScoreFinal['Défaite à la mi-temps'];
      valueLD.group = SCORE_FINAL.NUL;
      const valueLL: ValueModel = new ValueModel('0', '0');
      valueLL.key = ScoreFinal['Défaite à la mi-temps'];
      valueLL.group = SCORE_FINAL.DEFAITE;
      // Home Results
      homeResults.forEach((match: any) => {
        let butPourHT = null;
        let butContreHT = null;
        let butPourFT = null;
        let butContreFT = null;
        butPourHT = (match.side === 'a') ? match.HTAG : match.HTHG;
        butContreHT = (match.side === 'h') ? match.HTAG : match.HTHG;
        butPourFT = (match.side === 'a') ? match.FTAG : match.FTHG;
        butContreFT = (match.side === 'h') ? match.FTAG : match.FTHG;
        // Gagne à la mi-temps
        if (butPourHT > butContreHT) {
            if (butPourFT > butContreFT) {
                valueWW.oneValue = this.incrementString(valueWW.oneValue);
            } else if (butPourFT === butContreFT) {
                valueWD.oneValue = this.incrementString(valueWD.oneValue);
            } else if (butPourFT < butContreFT) {
                valueWL.oneValue = this.incrementString(valueWL.oneValue);
            }
            // Nul à la mi-temps
        } else if (butPourHT === butContreHT) {
            if (butPourFT > butContreFT) {
                valueDW.oneValue = this.incrementString(valueDW.oneValue);
            } else if (butPourFT === butContreFT) {
                valueDD.oneValue = this.incrementString(valueDD.oneValue);
            } else if (butPourFT < butContreFT) {
                valueDL.oneValue = this.incrementString(valueDL.oneValue);
            }
            /* Défaite à la mi-temps */
        } else if (butPourHT < butContreHT) {
            if (butPourFT > butContreFT) {
                valueLW.oneValue = this.incrementString(valueLW.oneValue);
            } else if (butPourFT === butContreFT) {
                valueLD.oneValue = this.incrementString(valueLD.oneValue);
            } else if (butPourFT < butContreFT) {
                valueLL.oneValue = this.incrementString(valueLL.oneValue);
            }
        }
      });
      // Away Results
      awayResults.forEach((match: any) => {
        let butPourHT = null;
        let butContreHT = null;
        let butPourFT = null;
        let butContreFT = null;
        butPourHT = (match.side === 'a') ? match.HTAG : match.HTHG;
        butContreHT = (match.side === 'h') ? match.HTAG : match.HTHG;
        butPourFT = (match.side === 'a') ? match.FTAG : match.FTHG;
        butContreFT = (match.side === 'h') ? match.FTAG : match.FTHG;
        // Gagne à la mi-temps
        if (butPourHT > butContreHT) {
            if (butPourFT > butContreFT) {
                valueWW.twoValue = this.incrementString(valueWW.twoValue);
            } else if (butPourFT === butContreFT) {
                valueWD.twoValue = this.incrementString(valueWD.twoValue);
            } else if (butPourFT < butContreFT) {
                valueWL.twoValue = this.incrementString(valueWL.twoValue);
            }
            // Nul à la mi-temps
        } else if (butPourHT === butContreHT) {
            if (butPourFT > butContreFT) {
                valueDW.twoValue = this.incrementString(valueDW.twoValue);
            } else if (butPourFT === butContreFT) {
                valueDD.twoValue = this.incrementString(valueDD.twoValue);
            } else if (butPourFT < butContreFT) {
                valueDL.twoValue = this.incrementString(valueDL.twoValue);
            }
            /* Défaite à la mi-temps */
        } else if (butPourHT < butContreHT) {
            if (butPourFT > butContreFT) {
                valueLW.twoValue = this.incrementString(valueLW.twoValue);
            } else if (butPourFT === butContreFT) {
                valueLD.twoValue = this.incrementString(valueLD.twoValue);
            } else if (butPourFT < butContreFT) {
                valueLL.twoValue = this.incrementString(valueLL.twoValue);
            }
        }
      });
      level.values.push(valueWW);
      level.values.push(valueWD);
      level.values.push(valueWL);
      level.values.push(valueDW);
      level.values.push(valueDD);
      level.values.push(valueDL);
      level.values.push(valueLW);
      level.values.push(valueLD);
      level.values.push(valueLL);
      model.levels.push(level);
      return model;
    }
    buildMoyenneMatchModel(homeStats: any, awayStats: any) {
      const homeResults: [] = homeStats.results;
      const awayResults: [] = awayStats.results;
      const model: StatUiModel = new StatUiModel();
      model.headerTitle = Libelles.MOY_MATCH;
      model.levels = [];
      const level: LevelModel = new LevelModel();
      level.titre = '';
      level.values = [];
      /* Moyenne de tirs */
      const averageShots: ValueModel = new ValueModel('0', '0');
      averageShots.group = MOYENNE_STATS.TIRS;
      /* Moyenne de tirs cadrés */
      const averageShotsTarget: ValueModel = new ValueModel('0', '0');
      averageShotsTarget.group = MOYENNE_STATS.TIRS_CADRES;
      /* Moyenne de corners */
      const averageCorners: ValueModel = new ValueModel('0', '0');
      averageCorners.group = MOYENNE_STATS.CORNERS;
      /* Moyenne de fautes */
      const averageFaults: ValueModel = new ValueModel('0', '0');
      averageFaults.group = MOYENNE_STATS.FAUTES;
      /* Moyenne de cartons jaune */
      const averageCartonJaune: ValueModel = new ValueModel('0', '0');
      averageCartonJaune.group = MOYENNE_STATS.CARTONS_JAUNE;
      /* Moyenne de cartons rouge */
      const averageCartonRouge: ValueModel = new ValueModel('0', '0');
      averageCartonRouge.group = MOYENNE_STATS.CARTONS_ROUGE;
      /* */
      homeResults.forEach((match: any) => {
            averageShots.oneValue = this.incrementString(averageShots.oneValue, match.side === 'a' ? match.AS : match.HS);
            averageShotsTarget.oneValue = this.incrementString(averageShotsTarget.oneValue, match.side === 'a' ? match.AST : match.HST);
            averageCorners.oneValue = this.incrementString(averageCorners.oneValue, match.side === 'a' ? match.AC : match.HC);
            averageFaults.oneValue = this.incrementString(averageFaults.oneValue, match.side === 'a' ? match.AF : match.HF);
            averageCartonJaune.oneValue = this.incrementString(averageCartonJaune.oneValue, match.side === 'a' ? match.AY : match.HY);
            averageCartonRouge.oneValue = this.incrementString(averageCartonRouge.oneValue, match.side === 'a' ? match.AR : match.HR);
      });
      awayResults.forEach((match: any) => {
        averageShots.twoValue = this.incrementString(averageShots.twoValue, match.side === 'a' ? match.AS : match.HS);
        averageShotsTarget.twoValue = this.incrementString(averageShotsTarget.twoValue, match.side === 'a' ? match.AST : match.HST);
        averageCorners.twoValue = this.incrementString(averageCorners.twoValue, match.side === 'a' ? match.AC : match.HC);
        averageFaults.twoValue = this.incrementString(averageFaults.twoValue, match.side === 'a' ? match.AF : match.HF);
        averageCartonJaune.twoValue = this.incrementString(averageCartonJaune.twoValue, match.side === 'a' ? match.AY : match.HY);
        averageCartonRouge.twoValue = this.incrementString(averageCartonRouge.twoValue, match.side === 'a' ? match.AR : match.HR);
      });
      averageShots.oneValue = this.computeAverageString(averageShots.oneValue, homeStats.M);
      averageShots.twoValue = this.computeAverageString(averageShots.twoValue, awayStats.M);
      averageShotsTarget.oneValue = this.computeAverageString(averageShotsTarget.oneValue, homeStats.M);
      averageShotsTarget.twoValue = this.computeAverageString(averageShotsTarget.twoValue, awayStats.M);
      averageCorners.oneValue = this.computeAverageString(averageCorners.oneValue, homeStats.M);
      averageCorners.twoValue = this.computeAverageString(averageCorners.twoValue, awayStats.M);
      averageFaults.oneValue = this.computeAverageString(averageFaults.oneValue, homeStats.M);
      averageFaults.twoValue = this.computeAverageString(averageFaults.twoValue, awayStats.M);
      averageCartonJaune.oneValue = this.computeAverageString(averageCartonJaune.oneValue, homeStats.M);
      averageCartonJaune.twoValue = this.computeAverageString(averageCartonJaune.twoValue, awayStats.M);
      averageCartonRouge.oneValue = this.computeAverageString(averageCartonRouge.oneValue, homeStats.M);
      averageCartonRouge.twoValue = this.computeAverageString(averageCartonRouge.twoValue, awayStats.M);
      level.values.push(averageShots);
      level.values.push(averageShotsTarget);
      level.values.push(averageCorners);
      level.values.push(averageFaults);
      level.values.push(averageCartonJaune);
      level.values.push(averageCartonRouge);
      model.levels.push(level);
      return model;
    }
    buildBestScorerModel() {}
    getButMatchModel(levelValues: ValueModel[], homeResults: [], awayResults: [] , key: string): ValueModel[] {
        /* 0 BUT */
        const valueZERO: ValueModel = new ValueModel();
        valueZERO.key = key;
        valueZERO.group = BUTS_MATCH.ZERO_BUT;
        valueZERO.oneValue = '0';
        valueZERO.twoValue = '0';
        /* 1 BUT */
        const valueONE: ValueModel = new ValueModel();
        valueONE.key = key;
        valueONE.group = BUTS_MATCH.ONE_BUT;
        valueONE.oneValue = '0';
        valueONE.twoValue = '0';
        /* 2 BUTS */
        const valueTWO: ValueModel = new ValueModel();
        valueTWO.key = key;
        valueTWO.group = BUTS_MATCH.TWO_BUT;
        valueTWO.oneValue = '0';
        valueTWO.twoValue = '0';
        /* 3 BUTS */
        const valueTHREE: ValueModel = new ValueModel();
        valueTHREE.key = key;
        valueTHREE.group = BUTS_MATCH.THREE_BUT;
        valueTHREE.oneValue = '0';
        valueTHREE.twoValue = '0';
        /* 4 BUTS + */
        const valueFOUR: ValueModel = new ValueModel();
        valueFOUR.key = key;
        valueFOUR.group = BUTS_MATCH.FOUR_BUT;
        valueFOUR.oneValue = '0';
        valueFOUR.twoValue = '0';
        homeResults.forEach((match: any) => {
            let but = null;
            if ((key === ButMatch.Marqués && match.side === 'a') || (key === ButMatch.Concédés && match.side === 'h') ) {
                but = match.FTAG;
            } else if ((key === ButMatch.Marqués && match.side === 'h') || (key === ButMatch.Concédés && match.side === 'a') ) {
                but = match.FTHG;
            } else if (key === ButMatch.Total ) {
                    but = match.FTHG + match.FTAG;
            }
            if (but === 0) {
                valueZERO.oneValue = this.incrementString(valueZERO.oneValue);
            } else if (but === 1) {
                valueONE.oneValue = this.incrementString(valueONE.oneValue);
            } else if (but === 2) {
                valueTWO.oneValue = this.incrementString(valueTWO.oneValue);
            } else if (but === 3) {
                valueTHREE.oneValue = this.incrementString(valueTHREE.oneValue);
            } else if (but >= 4) {
                valueFOUR.oneValue = this.incrementString(valueFOUR.oneValue);
            }

        });
        awayResults.forEach((match: any) => {
            let but = null;
            if ((key === ButMatch.Marqués && match.side === 'a') || (key === ButMatch.Concédés && match.side === 'h') ) {
                but = match.FTAG;
            } else if ((key === ButMatch.Marqués && match.side === 'h') || (key === ButMatch.Concédés && match.side === 'a') ) {
                but = match.FTHG;
            } else if (key === ButMatch.Total ) {
                    but = match.FTHG + match.FTAG;
            }
            if (but === 0) {
                valueZERO.twoValue = this.incrementString(valueZERO.twoValue);
            } else if (but === 1) {
                valueONE.twoValue = this.incrementString(valueONE.twoValue);
            } else if (but === 2) {
                valueTWO.twoValue = this.incrementString(valueTWO.twoValue);
            } else if (but === 3) {
                valueTHREE.twoValue = this.incrementString(valueTHREE.twoValue);
            } else if (but >= 4) {
                valueFOUR.twoValue = this.incrementString(valueFOUR.twoValue);
            }
        });
        levelValues.push(valueZERO);
        levelValues.push(valueONE);
        levelValues.push(valueTWO);
        levelValues.push(valueTHREE);
        levelValues.push(valueFOUR);
        return levelValues;
    }
    /* SAISON */
    buildAttackSpeedModel(homeStats: any, awayStats: any) {
      console.log('homeStats : ', homeStats);
      console.log('awayStats : ', awayStats);
      const model: StatUiModel = new StatUiModel();
      model.headerTitle = Libelles.ATTACK_SPEED_STAT;
      model.options = this.translateService.convertEnumToOption(AttackSpeedStat);
      model.optionSelectedDefault = AttackSpeedStat.Fast;
      model.levels = [];
      const level: LevelModel = new LevelModel();
      level.titre = '';
      level.values = [];
      model.levels.push(level);
      return model;
    }
    /* UTILITAIRES */
    incrementString(value: string, increment?: number): string {
        if (!value) {
            value = '0';
        }
        let tmp = Number(value);
        if (increment === undefined || increment === null) {
            tmp += 1;
        } else {
            tmp = tmp + increment;
        }
        return tmp.toString();
    }
    computeAverageString(value: string, dividende: number) {
        if (!dividende || dividende === 0) {
                return value;
        }
        const tmp = Number(value);
        return (tmp / dividende).toFixed(2).toString();
    }
}
