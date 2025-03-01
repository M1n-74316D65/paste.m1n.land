---
title: 'Guide: Installing and Running WeMod on Lutris'
description: 'Step-by-step guide to install and run WeMod, a game cheat and enhancement platform, using Lutris on Linux. This guide focuses on a method suitable for games added manually to Lutris, especially helpful for Steam Deck users.'
pubDate: 'Dec 07 2024'
tags: ['lutris', 'wemod', 'guide', 'installation', 'gaming', 'linux', 'steam-deck', 'wine', 'winetricks']
---

[GUIDE] Installing and running WeMod on Lutris
Guide

I have managed to install and successfully run WeMod from Lutris last night. I want to give big thanks to the creator of WeMod Launcher repo, which had the steps that helped me actually get WeMod to install. The repo linked has the steps on how to make WeMod work with Steam Tinker Launch, which is fine, but games that are installed manually and added to Lutris will most probably not work with that method. So I was playing around to see if I could get it to work on Lutris. I will use some steps for installing WeMod to the Steam Deck from the repo itself and then add my own details for making it work specifically on Lutris.

## Installing WeMod

Wemod's installer has some issues running under wine (I believe it relates to UAC) and so may fail to run. A workaround would be to either copy the files from a Windows PC or with the steps below.

1. If you don't have it already, install PeaZip from Discover (Any archiving software will do here, I just have PeaZip myself).

2. Go to https://api.wemod.com/client/download, which would trigger the download of the latest version of WeMod offline / full installer.

3. Locate the `.exe` file you downloaded, right click on it and select **Open with**. Search for PeaZip and open the executable with it.

4. Here you shall see a file which ends with `.nupkg`, double-click on this and a new PeaZip window will open up with the contents of that directory.

5. Here you shall see a directory named `"lib"`, go inside it and then there would be another directory named `"net45"`, this folder contains the WeMod installation.

6. While inside the directory `"lib"`, select **Extract to** from the options at the top of PeaZip and choose the folder you want to extract its contents. This will be the installation folder, you can also move the files around after you have extracted them to any other directory you want.

7. At this point you will have WeMod installed, but it is not ready to run yet as it needs some dependencies in the Wine prefix of Lutris before it starts.

## Configuring Lutris

1. Add the `WeMod.exe` which is in the `"net45"` folder we extracted in the steps above to Lutris. Add it as you would a normal game executable. Make sure the runner selected is the same as the one the game will run in otherwise WeMod will not recognize the game.

2. After you have added WeMod to Lutris, select it and then click the "up arrow" on the Wine button which is next to Play button at the bottom. Select **Winetricks** and wait for a new window to open up.

3. Select **default prefix** and click **OK**.

4. Select **Install fonts** and click **OK**.

5. Select **allfonts** and click **OK**. Wait for the installation to finish (Do not close Lutris even if it seems like it is doing nothing). Once it is done the winetricks window will open again by itself.

6. Select **Install a Windows DLL or component** and click **OK**.

7. In the list that will show up select **dotnet48**, **sdl** and click **OK**. You again need to wait for the installation to finish, but this time it will take a lot longer and might seem like Lutris is doing nothing. Because of dotnet48 it will take quite some time to finish this installation. If you want to see that Lutris is actually installing the dependencies, you can open task manager from winetricks and see that dotnet48 process is running.

8. Once the installation is done, the winetricks window will open again. Just click **cancel** until it closes.

9. That's it, WeMod should now be able to run by clicking **Play** on Lutris.

## Using WeMod

You can now use WeMod the same as you would use it on a PC. Just run it, select the game you want to play and either install the game or select the executable of the game manually from WeMod. You can run the game from WeMod and it will run within the same Wine prefix. You can also start the game separately from Lutris and then run WeMod after it. As long as you have added the executable to WeMod and hit Play on it, it will recognize the running game. I tested all of this myself with Motosport Manager and it worked perfectly fine in both Desktop and Game Mode. I do not know if it will work with every single game so YMMV here.

PS: I tried to make Aurora from Cheathappens work but it was throwing a lot of errors when it ran. Probably dependencies missing in the wine prefix, but I did not spend too much time around it and gave up. I suspect with the right dependencies it should work the same as WeMod.

Original: https://www.reddit.com/r/SteamDeck/comments/122gqhu/guide_installing_and_running_wemod_on_lutris/
