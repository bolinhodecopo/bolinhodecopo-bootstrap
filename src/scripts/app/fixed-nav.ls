$ = require 'jquery'
win = $ window
body = $ 'body'
nav = $ '.app-nav'
navLimit = nav.position!.top

module.exports = ->
  windowHeight = win.scrollTop!

  if windowHeight >= navLimit
    body.addClass "fixed"
  else
    body.removeClass "fixed"
