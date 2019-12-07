import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { OutputSectionComponent } from './sections/output-section/output-section.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'json-csv-web-app';
  loading = true;

  @ViewChild(OutputSectionComponent, {static: false})
  outputComponent: OutputSectionComponent;

  ngOnInit() {
    this.loading = false;
  }

  handleJsonChangedEvent() {
    this.outputComponent.whitelist.reset();
    this.outputComponent.blacklist.reset();
  }
}
