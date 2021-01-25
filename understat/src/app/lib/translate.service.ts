import { Injectable } from '@angular/core';
import { OptionModel } from '../models/option-model';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {
    constructor() {}
    convertEnumToOption(enumeration: any): OptionModel[] {
        const map: OptionModel[] = [];
        Object.keys(enumeration).forEach((key) => {
            const option: OptionModel = new OptionModel();
            option.libelle = key;
            option.value = enumeration[key];
            map.push(option);
        });
        return map;
    }
}
