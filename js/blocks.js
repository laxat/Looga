

Blockly.HSV_SATURATION = 1;
Blockly.HSV_VALUE = 1;
MOVEMENT_HUE = 33;
LOOPS_HUE = 200; 
SCENE_HUE = 49;
var locale = getMsg(); 

Blockly.Blocks['robot_moveRight'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "common/blocks/motion/right.svg",
          30,  
          20,
          "*"))
        .appendField(new Blockly.FieldNumber(10), "STEPS");
    this.setColour(MOVEMENT_HUE); 
    this.setPreviousStatement(true); 
    this.setNextStatement(true);     
    }
  };

  Blockly.JavaScript['robot_moveRight'] = function(block) {
    // Generate JavaScript for the example_image function
    return 'moveRight(' + block.getFieldValue("STEPS") + ', \'' + block.id + '\');\n';
  };

  Blockly.Blocks['robot_moveLeft'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "common/blocks/motion/left.svg",
          30,  
          20,
          "*"))
          .appendField(new Blockly.FieldNumber(10), "STEPS");
    this.setColour(MOVEMENT_HUE); 
    this.setPreviousStatement(true); 
    this.setNextStatement(true);     
    }
  };

  Blockly.JavaScript['robot_moveLeft'] = function(block) {
    // Generate JavaScript for the example_image function
    return 'moveLeft(' + block.getFieldValue("STEPS") + ', \'' + block.id + '\');\n';
  };

  Blockly.Blocks['robot_moveUpward'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "common/blocks/motion/up.svg",
          30,  
          20,
          "*"))
          .appendField(new Blockly.FieldNumber(10), "STEPS");
    this.setColour(MOVEMENT_HUE); 
    this.setPreviousStatement(true); 
    this.setNextStatement(true);     
    }
  };

  Blockly.JavaScript['robot_moveUpward'] = function(block) {
    // Generate JavaScript for the example_image function
    return 'moveUpward(' + block.getFieldValue("STEPS") + ', \'' + block.id + '\');\n';
  };

  Blockly.Blocks['robot_moveDownward'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "common/blocks/motion/down.svg",
          30,  
          20,
          "*"))
          .appendField(new Blockly.FieldNumber(10), "STEPS");
    this.setColour(MOVEMENT_HUE); 
    this.setPreviousStatement(true); 
    this.setNextStatement(true);     
    }
  };

  Blockly.JavaScript['robot_moveDownward'] = function(block) {
    // Generate JavaScript for the example_image function
    return 'moveDownward(' + block.getFieldValue("STEPS") + ', \'' + block.id + '\');\n';
  };


  Blockly.Blocks['robot_loops'] = {
    init: function() {
      this.appendValueInput("TIMES")
          .appendField(new Blockly.FieldImage(
            "common/blocks/loops/loops.svg",
            35,  
            35,
            "*"))
        this.appendStatementInput("DO")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(LOOPS_HUE); 
   this.setTooltip("");
   this.setHelpUrl("");
  }
};

  Blockly.JavaScript['robot_loops'] = function(block) {
    // Repeat n times.
  Blockly.JavaScript.STATEMENT_SUFFIX = `highlightBlock(%1);\n`;
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  var code = '';
  var loopVar = Blockly.JavaScript.nameDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.JavaScript.nameDB_.getDistinctName(
        'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' + 
      branch + '}\n'
  return code;

}

Blockly.Blocks['robot_back'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "common/blocks/scene/back.svg",
          25,  
          25,
          "*"))
        .appendField(
          new Blockly.FieldDropdown([
            [{"src":"common/background/back1.png","width":15,"height":15,"alt":"WARS"}, 'RIVER'], 
              [{"src":"common/background/back2.png","width":15,"height":15,"alt":"FIELD"},'TENT'], 
              [{"src":"common/background/back3.png","width":15,"height":15,"alt":"RED"} , 'BARN'], 
              [{"src":"common/background/back4.png","width":15,"height":15,"alt":"BLUE"},'CLASS']
            ]),'BACKGROUND');
    this.setColour(SCENE_HUE);
    this.setPreviousStatement(true); 
    this.setNextStatement(true); 
 this.setTooltip("");
 this.setHelpUrl("");
}
};

Blockly.JavaScript['robot_back'] = function(block){

  var word = String(block.getFieldValue('BACKGROUND'));

  return 'changeBack("' + word + '"' + ', \'' + block.id + '\');\n'; 
}

Blockly.Blocks['robot_light'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "common/blocks/scene/light.svg", 
          30,
          30,
          "*"))
          .appendField(
            new Blockly.FieldDropdown([
              [locale.block.off, 'OFF'], 
                [{"src":"common/red.jpg","width":15,"height":15,"alt":"red"}, 'RED'], 
                [{"src":"common/blue.png","width":15,"height":15,"alt":"blue"},'BLUE'], 
                [{"src":"common/green.png","width":15,"height":15,"alt":"green"} , 'GREEN']
              ]),'LIGHT');   
      this.setColour(SCENE_HUE); 
      this.setPreviousStatement(true); 
      this.setNextStatement(true); 
  }
}; 

Blockly.JavaScript['robot_light'] = function(block) {

  var word = String(block.getFieldValue('LIGHT')); 
  var code = ''; 
  if(word == 'OFF'){
    code += 'turnOff( \'' + block.id + '\');\n';
  }
  else{
    code += 'turnOn("' + word + '"' + ', \'' + block.id + '\');\n'; 
  }
  return code; 
}
  