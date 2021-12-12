import NotImplementedException from '../notImplementedException.mjs'

export default class TableComponent {
  render(_data) {
    throw new NotImplementedException(this.render.name)
  }
}