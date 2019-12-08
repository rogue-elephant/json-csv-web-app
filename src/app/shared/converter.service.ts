import { Injectable } from "@angular/core";
import {
  Table,
  IJsonToCsvConversionStrategy,
  JsonCsvConverter
} from "json-csv-tool";
import { JsonService } from "./json.service";
import { MatTableDataSource } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class ConverterService {
  public convertedTable: Table;
  public converterOptions: IJsonToCsvConversionStrategy;
  public propNameGroups: {
    group: string;
    showInBlacklist: true;
    showInWhitelist: true;
    props: {
      name: string;
      showInWhitelist: boolean;
      showInBlacklist: boolean;
    }[];
  }[] = [];
  public matTables: {
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
      }

      if (this.converterOptions.whiteList.length < 1) {
        this.propNameGroups = [];
        this.propNameGroups.push({
          group: this.convertedTable.title,
          showInBlacklist: true,
          showInWhitelist: true,
          props: this.convertedTable.columnNames.map(colName => {
            return {
              name: colName,
              showInBlacklist: true,
              showInWhitelist: true
            };
          })
        });
        this.propNameGroups = [
          ...this.propNameGroups,
          ...(this.convertedTable.rows
            .filter(x => x.filter(y => y.linkedTable != null).length > 0)
            .map(x => x.filter(y => y.linkedTable != null))
            .map(x =>
              x.reduce(
                (acc, y) =>
                  acc.concat({
                    group: y.linkedTable.title,
                    showInBlacklist: true,
                    showInWhitelist: true,
                    props: y.linkedTable.columnNames.map(z => {
                      return {
                        name: y.linkedTable.title + "." + z,
                        showInBlacklist: true,
                        showInWhitelist: true
                      };
                    })
                  }),
                []
              )
            )[0] || [])
        ].sort((x, y) => (x.group >= y.group ? 1 : x.group < y ? -1 : 0));
      }
    } catch (error) {}
  }
}
