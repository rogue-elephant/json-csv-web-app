import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CsvOutputSectionComponent } from './sections/csv-output-section/csv-output-section.component';
import { MarkdownOutputSectionComponent } from './sections/markdown-output-section/markdown-output-section.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'json-csv-web-app';
  loading = true;

  @ViewChild(CsvOutputSectionComponent, {static: false})
  csvOutputComponent: CsvOutputSectionComponent;

  @ViewChild(MarkdownOutputSectionComponent, {static: false})
  markdownOutputComponent: MarkdownOutputSectionComponent;

  ngOnInit() {
    this.loading = false;
  }

  handleJsonChangedEvent() {
    [this.csvOutputComponent, this.markdownOutputComponent].forEach(component => {
      component.whitelist.reset();
      component.blacklist.reset();
      component.blacklistSearchControl.reset();
      component.whitelistSearchControl.reset();
    });
  }
}
