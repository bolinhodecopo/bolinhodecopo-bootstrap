$ = require 'jquery'
win = $ window
body = $ 'body'
nav = $ '.app-nav'
navLimit = nav.position!.top

module.exports = ->
  windowHeight = win.scrollTop!
  windowWidth = win.width!

  if windowWidth <= 400
    return false

  if windowHeight >= navLimit
    body.addClass "fixed"
  else
    body.removeClass "fixed"
