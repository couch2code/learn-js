var domify = require('npm:domify')
var R = require('npm:ramda')
var elementBlock = require('./components/element')
var textElements = ['h1', 'h2', 'h3', 'p', 'li']
var imgElement = require('./components/img')
var ulElement = require('./components/ul')

var body = domify(`
<div class="container">
  <div class="row">
    <h1 class="text-md-center">LearnJS Lesson 1 - Exercise 2</h1>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div id="blocklyDiv" style="height: 480px; width: '100%';"></div>
    </div>
    <div class="col-md-6">
      <div class="pull-md-right">
        <button id="generate" class="btn btn-primary">Run</button>
      </div>
      <h4 class="m-t-3">Output</h3>
      <div class="jumbotron">
        <div id="output"></div>
      </div>
      <h4 class="m-t-3">Code</h3>
      <div class="">
        <pre id="code">

        </pre>
      </div>
    </div>
  </div>
</div>
<xml id="toolbox" style="display: none">
    ${textElements.map(el => '<block type="' + el + '"></block>')}
    <block type="img"></block>
    <block type="ul"></block>
</xml>
`)

document.body.appendChild(body)

textElements.map(el => elementBlock(Blockly, el))
imgElement(Blockly)
ulElement(Blockly)


var workspace = Blockly.inject('blocklyDiv', {
  media: 'https://rawgit.com/google/blockly/master/media/',
  toolbox: document.getElementById('toolbox')
})


document.getElementById('generate').addEventListener('click', function(e) {

    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var el = document.getElementById('code')
    el.innerText = code //R.tail(code.split('// start\n'))

    var target = document.getElementById('output')
    target.innerHTML = ''

    try {
      eval(code);
    } catch (e) {
      alert(e);
    }
})
