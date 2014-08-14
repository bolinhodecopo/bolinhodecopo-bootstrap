$ = require 'jquery'
win = $ window
body = $ 'body'
logo = $ '.app-header .logo'
nav = $ '.app-nav'
navLimit = nav.position!.top

module.exports = ->
  windowHeight = win.scrollTop!
  yPos = windowHeight / 3

  if windowHeight >= navLimit
    body.addClass "fixed"
  else
    logo.css top: yPos
    body.removeClass "fixed"
