// @ts-nocheck

// A simple API for manipulating collections of blocks
export default class CollectionAPI {
  blocks = $state([]);
  selected_index = $state(undefined);
  
  constructor(blocks) {
    this.init(blocks);
  }

  clearSelection() {
    this.selected_index = undefined;
  }

  init(blocks) {
    this.blocks = blocks;
    // In case the current selection becomes invalid, set it to undefined.
    // if (!this.blocks[this.selected_index]) fails, why?
    if (!blocks[this.selected_index]) {
      this.selected_index = undefined;
    }
  }

  getSelectedBlock() {
    return this.blocks[this.selected_index];
  }

  // addBlockAfter(type) {
  //   // parseBlock will fill in default values
  //   const new_block = parseBlock({ type });
  //   this.blocks.splice(selected_index+1, 0, new_block);
  //   this.blocks = this.blocks; // trigger update
  // }

  deleteBlock() {
    this.blocks.splice(selected_index, 1);
    this.selected_index = undefined;
    this.blocks = this.blocks; // trigger update
  }

  moveBlock(direction) {
    let to_index;
    if (direction === 'up' && this.selected_index > 0) {
      to_index = this.selected_index - 1;
    } else if (direction === 'down' && this.selected_index < this.blocks.length - 1) {
      to_index = this.selected_index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = this.blocks.splice(this.selected_index, 1)[0];
    // Insert at new position
    this.blocks.splice(to_index, 0, element);
    this.selected_index = to_index;
    this.blocks = this.blocks; // trigger update
  }
}
