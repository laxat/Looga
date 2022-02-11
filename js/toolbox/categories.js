
class CustomCategory extends Blockly.ToolboxCategory {
    
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }

    createLabelDom_(name) {
        const label = document.createElement('div');
        label.setAttribute('id', this.getId() + '.label');
        label.textContent = name;
        label.classList.add(this.cssConfig_['label']);
        return label;
      }
    
      /** @override */
      createIconDom_() {
        const icon = document.createElement('div');
        icon.classList.add('categoryBubble');
        icon.style.backgroundColor = this.colour_;
        return icon;
      }

    addColourBorder_(colour){
        //No-op
    }

    setSelected(isSelected){
        // We do not store the label span on the category, so use getElementsByClassName.
        // var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
        if (isSelected) {
          // Change the background color of the div to white.
          this.rowDiv_.style.backgroundColor = 'gray';
          Blockly.utils.dom.addClass(this.rowDiv_, this.cssConfig_['selected']);
          // Set the colour of the text to the colour of the category.
        //   labelDom.style.color = this.colour_;
        //   this.iconDom_.style.color = this.colour_;
        } else {
          // Set the background back to the original colour.
          this.rowDiv_.style.backgroundColor = '';
          Blockly.utils.dom.removeClass(this.rowDiv_, this.cssConfig_['selected']);
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED, isSelected);
    }
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, 
    true);