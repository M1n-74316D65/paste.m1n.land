---
title: 'Set Nautilus as Default Directory App (GNOME)'
description: 'Configures GNOME to use Nautilus as the default application for opening directories using xdg-mime.  This is an example of a pastebin entry using Markdown format with YAML frontmatter.'
pubDate: 'Dec 15 2024'
tags: ['arch', 'vscode', 'gnome', 'nautilus', 'xdg-mime']
---
To sign commits in Git with Fish shell, you'll need to use GPG (GNU Privacy Guard) keys. Here's a step-by-step guide:

1. **Generate a GPG key pair**:
   - Run: `gpg --full-generate-key`
   - Follow the prompts to generate your key pair.

2. **List GPG keys**:
   - After generating the key pair, run: `gpg --list-secret-keys --keyid-format LONG`

3. **Configure Git to use your GPG key**:
   - Replace `<KEY_ID>` with your actual GPG key ID.
   - Run:
     ```bash
     git config --global user.signingkey <KEY_ID>
     git config --global gpg.program (command to specify GPG program)
     ```
   - Specify the GPG program, usually just `gpg2`.

4. **Set commits to be signed by default**:
   - Run: `git config --global commit.gpgsign true`

5. **Sign your commits**:
   - Commit as usual: `git commit -m "Your commit message"`

6. **Push your commits**:
   - Push your changes to GitHub: `git push`

Remember to replace `<KEY_ID>` with your actual GPG key ID obtained in step 2.

### Display GPG Public Key for GitHub

To display your GPG public key for adding it to GitHub:

1. List your GPG keys:
   - Run: `gpg --list-keys`

2. Display the public key:
   - Run: `gpg --armor --export <KEY_ID>`
   - Replace `<KEY_ID>` with the ID of the key you want to export.

3. Copy the output, which will be your GPG public key.

4. Add this public key to your GitHub account:
   - Go to GitHub account settings > SSH and GPG keys.
   - Click on "New GPG key" or "Add GPG key".
   - Paste your GPG public key into the provided text box.
   - Give your key a descriptive title.
   - Click on "Add GPG key" or "Save" to add the key to your GitHub account.
