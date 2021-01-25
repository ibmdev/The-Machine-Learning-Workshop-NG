import { LevelModel } from "./level-model";
import { OptionModel } from "./option-model";

export class StatUiModel {
    headerTitle: string;
    options: OptionModel[];
    levels: LevelModel[];
    optionSelectedDefault: string;
    typeStatistiques: string;
}
