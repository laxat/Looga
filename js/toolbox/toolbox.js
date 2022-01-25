

class ToolboxLabel extends Blockly.ToolboxItem {

    constructor(toolboxItemDef, parentToolbox)
    {
        super(toolboxItemDef, parentToolbox); 
        this.label = null; 
    }

    init() {
        // Create the label.
        this.label = document.createElement('label');
        // Set the name.
        this.label.textContent = this.toolboxItemDef_['name'];
        // Set the color.
        this.label.style.color = this.toolboxItemDef_['colour'];
        // Any attributes that begin with css- will get added to a cssconfig.
        const cssConfig = this.toolboxItemDef_['cssconfig'];
        // Add the class.
        if (cssConfig) {
          this.label.classList.add(cssConfig['label']);
        }
    }

    getDiv(){
        return this.label; 
    }

}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM, 
    'toolboxlabel',
    ToolboxLabel
); 