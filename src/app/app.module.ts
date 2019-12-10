import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { InputJsonSectionComponent } from './sections/input-json-section/input-json-section.component';
import { JsonService } from './shared/json.service';
import { CsvOutputSectionComponent } from './sections/csv-output-section/csv-output-section.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MarkdownOutputSectionComponent } from './sections/markdown-output-section/markdown-output-section.component';
import { ShowdownModule } from 'ngx-showdown';

@NgModule({
  declarations: [AppComponent, InputJsonSectionComponent, CsvOutputSectionComponent, MarkdownOutputSectionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ShowdownModule.forRoot({emoji: true, noHeaderId: true, flavor: 'github'})
  ],
  providers: [CdkColumnDef, JsonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
