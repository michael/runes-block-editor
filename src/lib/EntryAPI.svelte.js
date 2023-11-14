// A simple API for manipulating entries
export default class EntryAPI {
  props = $state({});
  
  /**
   * @param {object} entry
   */
  constructor(props) {
    // We store the original entry so we can discard changes of the editing session
    this.originalProps = props;
    this.props = JSON.parse(JSON.stringify(props));
  }

  // Reinit props from original Props.
  discardChanges() {
    this.props = JSON.parse(JSON.stringify(this.originalProps));
  }

  save() {
    console.log('TODO: persist the changes to the backend');
  }
}
