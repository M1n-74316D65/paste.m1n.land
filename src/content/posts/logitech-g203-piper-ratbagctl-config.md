---
title: 'Logitech G203 Mouse Configuration with Piper and Ratbagctl'
description: 'Configuration commands for Logitech G203 gaming mouse using Piper and ratbagctl. This snippet remaps mouse buttons 3, 4, and 5 to specific macro actions: F20, F24, and Play/Pause.'
pubDate: 'Dec 17 2024'
tags: ['logitech', 'g203', 'piper', 'ratbagctl', 'mouse', 'configuration', 'macros', 'linux']
---

```bash
logi-g203-piper-config
ratbagctl "singing-gundi" button "3" action set macro KEY_F20
ratbagctl "singing-gundi" button "4" action set macro KEY_F24
ratbagctl "singing-gundi" button "5" action set macro KEY_PLAYPAUSE
