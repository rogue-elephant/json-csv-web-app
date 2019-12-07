import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  JsonCsvConverter,
  IJsonToCsvConversionStrategy,
  Table
} from "json-csv-tool";
import { IRowValue } from "json-csv-tool/lib/models/converted-csv";
import { MatTableDataSource } from "@angular/material";
import { saveAs } from "file-saver";
import { JsonService } from "src/app/shared/json.service";
import { ConverterService } from "src/app/shared/converter.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-output-section",
  templateUrl: "./output-section.component.html",
  styleUrls: ["./output-section.component.css"]
})
export class OutputSectionComponent implements OnInit {
  @Output()
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  whitelist = new FormControl();
  blacklist = new FormControl();
  currentWhitelist: string;
  currentBlacklist: string;

  rowDatas: [][] = [];

  tableData: MatTableDataSource<any>;

  constructor(
    public jsonService: JsonService,
    public converterService: ConverterService
  ) {}

  ngOnInit() {}

  trackByIndex = (index: number, obj: any): any => index;

  convertJsonModel() {
    this.loading.emit(true);
    try {
      this.converterService.matTables = [];
      this.converterService.converterOptions.whiteList = this.whitelist.value;
      this.converterService.convertJsonModel();
      this.tableData = this.tableToMatTable(
        this.converterService.convertedTable
      );
      this.converterService.matTables.splice(0, 0, {
        title: this.converterService.convertedTable.title || "Table",
        matTable: this.tableData,
        convertedtTable: this.converterService.convertedTable
      });
    } catch (error) {}

    this.loading.emit(false);
  }

  tableToMatTable = (table: Table) => {
    const rowData = [];
    table.rows.forEach(row => {
      const rowValue = {};
      table.columnNames.forEach(colName => {
        const rowCol = row.filter(x => x.columnName === colName)[0];
        rowValue[colName] = rowCol.value;

        if (rowCol.linkedTable) {
          this.converterService.matTables.push({
            title: `${row[0].value}: ${rowCol.linkedTable.title}`,
            matTable: this.tableToMatTable(rowCol.linkedTable),
            convertedtTable: rowCol.linkedTable
          });
        }
      });
      rowData.push(rowValue);
    });
    return new MatTableDataSource(rowData);
  }

  getRowColValue = (row: IRowValue[], columnName: string) =>
    row.filter(x => x.columnName === columnName)[0].value;

  downloadFile() {
    const blob = new Blob([this.converterService.convertedTable.csv], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, `${this.converterService.convertedTable.title}.csv`);
  }
}
