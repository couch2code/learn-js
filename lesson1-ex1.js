var domify = require('npm:domify')
var R = require('npm:ramda')

var body = domify(`
<div class="container">
  <div class="row">
    <h1 class="text-md-center">LearnJS Lesson 1 - Exercise 1</h1>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div id="blocklyDiv" style="height: 480px; width: '100%';"></div>
    </div>
    <div class="col-md-6">
      <div class="pull-md-right">
        <button id="generate" class="btn btn-primary">Run</button>
      </div>
      <h4 class="m-t-3">Code</h3>
      <div class="">
        <pre id="code">

        </pre>
      </div>
      <h4 class="m-t-3">Output</h3>
      <div class="jumbotron">
        <div id="output"></div>
      </div>
    </div>
  </div>
</div>
<xml id="toolbox" style="display: none">
    <block type="write"></block>
</xml>
`)

document.body.appendChild(body)

// document.body.appendChild(domify('<script src="https://cdn.rawgit.com/google/blockly/master/blockly_compressed.js"></script>'))
// document.body.appendChild(domify('<script src="https://cdn.rawgit.com/google/blockly/master/blocks_compressed.js"></script>'))
// document.body.appendChild(domify('<script src="https://cdn.rawgit.com/google/blockly/master/msg/js/en.js"></script>'))
// document.body.appendChild(domify('<script src="https://cdn.rawgit.com/google/blockly/master/javascript_compressed.js"></script>'))

Blockly.Blocks['write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("write")
        .appendField(new Blockly.FieldTextInput("enter text"), "TEXT");
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
}

Blockly.JavaScript['write'] = function(block) {
  var text = block.getFieldValue('TEXT');
  // TODO: Assemble JavaScript into code variable.
  var code = `
    var target = document.getElementById('output')
    target.innerHTML = ''

    // start
    var el = document.createElement('h1')
    el.innerText = '${text}'
    target.appendChild(el)
  `
  return code;
}

var workspace = Blockly.inject('blocklyDiv', {
  media: 'https://rawgit.com/google/blockly/master/media/',
  toolbox: document.getElementById('toolbox')
})


document.getElementById('generate').addEventListener('click', function(e) {

    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var el = document.getElementById('code')
    el.innerText = R.tail(code.split('// start\n'))
    try {
      eval(code);
    } catch (e) {
      alert(e);
    }
})
