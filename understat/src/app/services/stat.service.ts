import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
export class StatService {
    understatData: [];
    /*Liste des noms des leagues */
    leaguesName: string[] = [];
    /* Liste des fixtures */
    groupFixtures: [];
    /* Liste des statistiques générales de la league */
    groupStats: any[];
    constructor() {}
    getTeamFromGroupStats(id: string): any {
        return this.groupStats.filter((team: any) =>
            team.id === id
        );
    }
}
