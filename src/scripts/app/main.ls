require! './fixed-nav'
$ = require 'jquery'

$ ->
  win = $ window
  win.scroll fixed-nav
