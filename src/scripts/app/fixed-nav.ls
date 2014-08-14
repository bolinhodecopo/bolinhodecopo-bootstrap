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
    logo.fadeOut!
    body.addClass "fixed"
  else
    logo.fadeIn!
    logo.css top: yPos
    body.removeClass "fixed"
