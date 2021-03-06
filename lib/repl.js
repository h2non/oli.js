'use strict'

var readline = require('readline')
var version = require('../package.json').version
var echo = require('./helpers').log
var oli = require('./oli')

exports.init = function () {
  showBanner()
  initReadline()
}

function showBanner() {
  echo([
    '        _   _    ',
    '       | | (_)   ',
    '   ___ | |  _    ',
    '  / _ \\| | | |  ',
    ' | (_) | |_| |   ',
    '  \\___/\\___|_| ',
    ''
  ].join('\n'))

  echo('Oli experimental REPL interface (' + version + ')')
  echo('Type "examples" to see basic example codes')
  echo('Type "exit" to exit')
  echo()
}

function initReadline() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.setPrompt('oli> ')
  rl.prompt()

  rl.on('line', onWriteLine)
    .on('close', onClose)
}

function onWriteLine(line) {
  switch (line = line.trim()) {
    case 'examples':
      printExamples()
      break
    case 'exit':
      this.close()
      break
    default:
      echo(parse(line))
      break
  }
  this.prompt()
}

function onClose() {
  this.setPrompt('')
  this.prompt()
  echo('Goodbye! Thanks for using Oli')
  process.exit(0)
}

function printExamples() {
  echo([
    '  - 1, 2, 3',
    '  hello: world!',
    '  oli: rules: yes'
  ].join('\n'))
}

function parse(code) {
  try {
    return JSON.stringify(oli.parse(code), null, 2)
  } catch (e) {
    return e.name + ': ' + e.message
  }
}
