import { Component, OnInit } from '@angular/core';
import {JsonCsvConverter, IJsonToCsvConversionStrategy, ConvertedCsv} from 'json-csv-tool';
import { IRowValue } from 'json-csv-tool/lib/models/converted-csv';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'json-csv-web-app';
  jsonInput: any;
  jsonModel: any;
  convertedCsv: ConvertedCsv;
  converterOptions: IJsonToCsvConversionStrategy = {};

  tableData: MatTableDataSource<any>;

  updateJsonModel() {
    try {
      const rowData = [];
      this.jsonModel = JSON.parse(this.jsonInput);
      const converter = new JsonCsvConverter();
      const convertedJson = converter.convertJsonToCsv(this.jsonModel, this.converterOptions);
      this.convertedCsv = convertedJson;

      this.convertedCsv.rows.forEach(row => {
        const rowValue = {};
        this.convertedCsv.columnNames.forEach(colName => {
          rowValue[colName] = row.filter(x => x.columnName === colName)[0].value;
        });
        rowData.push(rowValue);
      });
      this.tableData = new MatTableDataSource(rowData);
    } catch (error) {

    }
  }

  getRowColValue = (row: IRowValue[], columnName: string) => row.filter(x => x.columnName === columnName)[0].value;
}
