import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatService {
  constructor() {}
  buildSelectModel(data: any[]): any[] {
    const model: any[] = [];
    data.forEach(l => {
        const line = { name: l.name };
        model.push(line);
    });
    return model;
  }
}
