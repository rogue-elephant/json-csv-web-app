import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { JsonService } from "src/app/shared/json.service";
import { ConverterService } from "src/app/shared/converter.service";

@Component({
  selector: "app-input-json-section",
  templateUrl: "./input-json-section.component.html",
  styleUrls: ["./input-json-section.component.css"]
})
export class InputJsonSectionComponent implements OnInit {
  @Output()
  jsonChangedEvent: EventEmitter<boolean> = new EventEmitter();
  jsonError: string;
  constructor(
    public jsonService: JsonService,
    private converterService: ConverterService
  ) {}

  ngOnInit() {}

  handleFile(file: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.updateJsonModel(e.target.result);
    reader.readAsText(file.target.files[0]);
  }

  jsonInputUpdated = (inputEvent: any) =>
    this.updateJsonModel(inputEvent.target.value);

  updateJsonModel(jsonInput: string) {
    this.jsonError = "";
    this.converterService.convertedTable = this.jsonService.jsonObject = null;
    this.converterService.matTables = [];
    try {
      this.jsonService.jsonObject = JSON.parse(jsonInput);
      this.converterService.propNames = [];
      this.converterService.converterOptions.whiteList = [];
      this.converterService.converterOptions.blackList = [];
      this.converterService.convertJsonModel();
    } catch (error) {
      this.jsonError = error;
    }
    this.jsonChangedEvent.emit(true);
  }
}
