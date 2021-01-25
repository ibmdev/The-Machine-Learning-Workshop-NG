export enum MoyenneBut {
    'Marqués' = 'M',
    'Concédés' = 'C'
}
export enum ButMatch {
    'Marqués' = 'M',
    'Concédés' = 'C',
    'Total' = 'T'
}
export enum ScoreFinal {
    'Gagne à la mi-temps' = 'W',
    'Nul à la mi-temps' = 'D',
    'Défaite à la mi-temps' = 'L'
}
export enum AttackSpeedStat {
    'Fast' = 'Fast',
    'Normal' = 'Normal',
    'Slow' = 'Slow',
    'Standard' = 'Standard'
}
export enum GameStat {
    'Score Egalité' = 'Goal diff 0',
    'Score + 1 but' = 'Goal diff +1',
    'Score moins 1 but' = 'Goal diff -1',
    'Score - 2 buts ou plus' = 'Goal diff < -1',
    'Score + 2 buts ou plus' = 'Goal diff > +1'
}
export enum ResultStat {
    'Tir Bloqué' = 'BlockedShot',
    'But' = 'Goal',
    'Tir Manqué' = 'MissedShot',
    'Sauvetage' = 'SavedShot',
    'Tir sur le Poteau' = 'ShotOnPost'
}
export enum TimingStat {
    '1-15' = '1-15',
    '16-30' = '16-30',
    '31-45' = '31-45',
    '46-60' = '46-60',
    '61-75' = '61-75',
    '76+' = '76+'
}
export enum SituationStat {
    'Coup Franc Direct' = 'DirectFreekick',
    'Corner' = 'FromCorner',
    'Jeu Ouvert' = 'OpenPlay',
    'Penalty' = 'Penalty',
    'Coup de pieds arrêté' = 'SetPiece',
}
export enum ShotZoneStat {
    'Contre son camp' = 'ownGoals',
    'Tir extérieur à la surface' = 'shotOboxTotal',
    'Tir zone Penalty' = 'shotPenaltyArea',
    'Tir 6 mètres' = 'shotSixYardBox'
}

