---
title: 'Generate Public Key from Private SSH Key using ssh-keygen'
description: 'This command uses `ssh-keygen` to extract the public key from an existing private SSH key file (`~/.ssh/id_rsa`) and saves it to a separate file (`~/.ssh/id_rsa.pub`). This is a common step for sharing your public key to enable SSH key-based authentication or to add it to services like GitHub, GitLab, or Bitbucket.'
pubDate: 'Dec 19 2024'
tags: ['ssh', 'ssh-key', 'keygen', 'public-key', 'private-key', 'security']
---

```bash
ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
