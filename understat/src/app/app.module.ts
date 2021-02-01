import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ResumeComponent } from './components/resume/resume.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { StatComponent } from './components/stats/stat.component';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SaisonComponent } from './components/saison/saison.component';
import { CompoComponent } from './components/compos/compo.component';
import {DataTableModule} from 'ngx-datatable-bootstrap4';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent, ResumeComponent, StatComponent, SaisonComponent, CompoComponent
  ],
  exports: [ ResumeComponent, StatComponent, SaisonComponent, CompoComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectDropDownModule,
    ButtonsModule.forRoot(),
    MatCardModule,
    MatTableModule,
    DataTableModule,
    NgxDatatableModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
