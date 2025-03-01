---
title: 'Enhanced Git Log Graph for Visualizing Repository History'
description: 'Enhanced `git log --graph` command for visually rich Git history.  Features custom formatting with colors for commits, authors, dates, and refs.'
pubDate: 'Dec 05 2024'
tags: ['git', 'git-log', 'graph', 'history', 'visualization', 'formatting']
---

```bash
git log --graph --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%an%C(reset)%C(bold yellow)%d%C(reset) %C(dim white)- %s%C(reset)' --all
