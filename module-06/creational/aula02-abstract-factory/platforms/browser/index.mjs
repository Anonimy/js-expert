import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableBrowserComponent from "./table.mjs";

export default class BroswerFactory extends ViewFactory {
  createTable() {
    return new TableBrowserComponent()
  }
}
