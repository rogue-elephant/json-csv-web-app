import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  JsonCsvConverter,
  IJsonToCsvConversionStrategy,
  Table
} from "json-csv-tool";
import { IRowValue } from "json-csv-tool/lib/models/converted-csv";
import { MatTableDataSource } from "@angular/material";
import { saveAs } from "file-saver";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "json-csv-web-app";
  jsonInput: any;
  jsonModel: any;
  convertedTable: Table;
  matTables: {
    title: string;
    matTable: MatTableDataSource<any>;
    convertedtTable: Table;
  }[] = [];
  converterOptions: IJsonToCsvConversionStrategy = { whiteList: [], blackList: [] };
  currentWhitelist: string;
  currentBlacklist: string;
  loading = true;

  tableData: MatTableDataSource<any>;

  ngOnInit() {
    this.loading = false;
  }

  trackByIndex = (index: number, obj: any): any => index;

  updateJsonModel() {
    this.loading = true;
    try {
      this.jsonModel = JSON.parse(this.jsonInput);
      const converter = new JsonCsvConverter();
      const convertedJson = converter.convertJsonToCsv(
        this.jsonModel,
        {
          ...this.converterOptions,
          blackList: this.converterOptions.blackList.length > 0 ? this.converterOptions.blackList : null,
          whiteList: this.converterOptions.whiteList.length > 0 ? this.converterOptions.whiteList : null
        }
      );
      this.matTables = [];
      this.convertedTable = convertedJson;
      if(!this.convertedTable.title && this.convertedTable.rows.length > 0) {
        this.convertedTable.title = this.convertedTable.rows[0][0].columnName;
        this.convertedTable.title += this.convertedTable.title[this.convertedTable.title.length] === 's' ? 'es' : 's';
      }

      this.tableData = this.tableToMatTable(this.convertedTable);
      this.matTables.splice(0, 0, {
        title: this.convertedTable.title || "Table",
        matTable: this.tableData,
        convertedtTable: this.convertedTable
      });
    } catch (error) {}

    this.loading = false;
  }

  tableToMatTable = (table: Table) => {
    const rowData = [];
    table.rows.forEach(row => {
      const rowValue = {};
      table.columnNames.forEach(colName => {
        const rowCol = row.filter(x => x.columnName === colName)[0];
        rowValue[colName] = rowCol.value;

        if (rowCol.linkedTable) {
          this.matTables.push({
            title: `${row[0].value}: ${rowCol.linkedTable.title}`,
            matTable: this.tableToMatTable(rowCol.linkedTable),
            convertedtTable: rowCol.linkedTable
          });
        }
      });
      rowData.push(rowValue);
    });
    return new MatTableDataSource(rowData);
  };

  getRowColValue = (row: IRowValue[], columnName: string) =>
    row.filter(x => x.columnName === columnName)[0].value;

  downloadFile() {
    const blob = new Blob([this.convertedTable.csv], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, `${this.convertedTable.title}.csv`);
  }

  addToList(list, converterList) {
    if (list) {
      converterList.push(list);
    }
    this.currentWhitelist = this.currentBlacklist = '';
    this.updateJsonModel();
  }

  removeFromList(index, converterList: any[]) {
    converterList.splice(index, 1);
    this.updateJsonModel();
  }
}
