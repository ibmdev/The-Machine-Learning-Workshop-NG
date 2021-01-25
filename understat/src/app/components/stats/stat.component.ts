import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OptionModel } from 'src/app/models/option-model';
import { StatUiModel } from 'src/app/models/stat-ui-model';
import { MatTableDataSource } from '@angular/material/table';
import { ValueModel } from 'src/app/models/value-model';
@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss'
    ],
     encapsulation: ViewEncapsulation.None,
  })

export class StatComponent implements OnInit, OnDestroy {
    @Input() statui: StatUiModel;
    /* Données référentiels */
    titre: string;
    options: OptionModel[];
    /* Modèles */
    optionsSelected: string;
    /* */
    displayedColumns = ['oneValue', 'group', 'twoValue'];
    dataSource: MatTableDataSource<ValueModel>;
    models: ValueModel[];
    constructor() {}
    ngOnInit(): void {
        this.titre = this.statui.headerTitle;
        this.options = this.statui.options;
        this.optionsSelected = this.statui.optionSelectedDefault;
        if (this.statui.levels && this.statui.levels.length > 0) {
            this.updateModel();
        }
    }
    ngOnDestroy(): void {
        console.log('Stat component > On Destroy');
    }
    onChangeOptions() {
        this.updateModel();
    }
    updateModel() {
        this.models = this.statui.levels[0].values.filter((v) => {
            if (v.key === this.optionsSelected) {
                return v;
            }
        });
        this.dataSource =  new MatTableDataSource(this.models);
    }
}