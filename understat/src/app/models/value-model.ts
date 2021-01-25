export class ValueModel {
    constructor(oneValue?: string, twoValue?: string) {
        this.oneValue = oneValue;
        this.twoValue = twoValue;
    }
    group: string;
    oneValue: string;
    twoValue: string;
    key: string;
    index: number;
}
