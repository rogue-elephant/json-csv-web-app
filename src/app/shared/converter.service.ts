import { Injectable } from "@angular/core";
import { Table, IJsonToCsvConversionStrategy, JsonCsvConverter } from "json-csv-tool";
import { JsonService } from './json.service';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: "root"
})
export class ConverterService {
  public convertedTable: Table;
  public converterOptions: IJsonToCsvConversionStrategy;
  matTables: {
    title: string;
    matTable: MatTableDataSource<any>;
    convertedtTable: Table;
  }[] = [];

  constructor(private jsonService: JsonService) {
    this.converterOptions = {
      whiteList: [],
      blackList: []
    };
  }

  convertJsonModel() {
    try {
      const converter = new JsonCsvConverter();
      const convertedJson = converter.convertJsonToCsv(
        this.jsonService.jsonObject,
        {
          ...this.converterOptions,
          blackList:
            this.converterOptions.blackList.length > 0
              ? this.converterOptions.blackList
              : null,
          whiteList:
            this.converterOptions.whiteList.length > 0
              ? this.converterOptions.whiteList
              : null
        }
      );
      this.convertedTable = convertedJson;
      if (!this.convertedTable.title && this.convertedTable.rows.length > 0) {
        this.convertedTable.title = this.convertedTable.rows[0][0].columnName;
        this.convertedTable.title +=
          this.convertedTable.title[this.convertedTable.title.length] === "s"
            ? "es"
            : "s";
      }
    } catch (error) {}
  }
}
