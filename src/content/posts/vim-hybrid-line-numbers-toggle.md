---
title: 'Vim: Toggle Hybrid Line Numbers'
description: 'Vim commands to enable, disable, and toggle hybrid line numbers display'
pubDate: 'Dec 03 2024'
tags: ['vim', 'line-numbers', 'hybrid-line-numbers', 'toggle', 'configuration']
---

```vim
" turn hybrid line numbers on
:set number relativenumber
:set nu rnu

" turn hybrid line numbers off
:set nonumber norelativenumber
:set nonu nornu

" toggle hybrid line numbers
:set number! relativenumber!
:set nu! rnu!
