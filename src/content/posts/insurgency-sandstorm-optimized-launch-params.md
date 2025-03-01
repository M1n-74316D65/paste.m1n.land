---
title: 'Optimized Launch Parameters for Insurgency: Sandstorm'
description: 'Launch parameters for Insurgency: Sandstorm to optimize performance, particularly when running on Linux using gamemoderun. Includes options for system memory allocation, utilizing all CPU cores, forcing DirectX 12, and disabling global invalidation.'
pubDate: 'Dec 13 2024'
tags: ['insurgency-sandstorm', 'game', 'launch-options', 'gamemoderun', 'linux', 'performance-tuning', 'dx12']
---

```bash
gamemoderun %command% -malloc=system -USEALLAVAILABLECORES -dx12  -NoGlobalInvalidation
