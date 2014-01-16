require! {
  fs
  path
  chai
  grunt
  sinon
  mkdirp
  rimraf
  suppose
  child_process.spawn
  '../../package.json'.version
}

node = process.execPath
oli-bin = path.join __dirname, '/../../', 'bin/oli'
cwd = process.cwd!
home-var = if process.platform is 'win32' then 'USERPROFILE' else 'HOME'

module.exports =

  oli: require '../../'
  oli-bin: oli-bin
  cwd: cwd
  node: node
  version: version
  grunt: grunt
  sinon: sinon
  expect: chai.expect
  should: chai.should
  assert: chai.assert
  rm: rimraf.sync
  mkdirp: mkdirp.sync
  chdir: process.chdir
  env: process.env
  home-var: home-var
  home: process.env[home-var]
  join: path.join

  createWriteStream: ->
    fs.createWriteStream ...

  exists: ->
    fs.exists-sync it

  read: grunt.file.read

  exec: (type, args, callback) ->
    command = spawn node, [ oli-bin ] ++ args
    if type is 'close'
      command.on type, callback
    else
      data = ''
      command.stdout.on type, -> data += it.to-string!
      command.on 'close', (code) -> data |> callback _, code

  suppose: (args) ->
    suppose node, [ oli-bin ] ++ args
  