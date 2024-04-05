This Valt is a example of how you can use Kanban and QuickAdd plugins to organize your mod list.

https://github.com/btripoloni/Obsidian-Nexus-mods-managent-Example/assets/1844377/79654666-8e1c-42ba-a5da-1eeaea0af478

> **Important!**
> This example is only for make notes about the mods from your load lists, There is no connection with ModOrganzer or Vortex Mod Manager.
### Pre-requisitos

Plugins: 
- [kanban](https://github.com/mgmeyers/obsidian-kanban)
- [QuickAdd](https://github.com/chhoumann/quickadd)

To use this Script you will need a personal api key from Nexus Mods, you can find yours [here](https://next.nexusmods.com/settings/api-keys)
**Important!** Don't share your api key with anyone, you can be banned for that!


Also do you will need the `domain name` and the `game id`from de game of the data will be imported.

Domain name:
  To get the `domain name`is simple, look the game's page URL on Nexus mods:
  Example: https://www.nexusmods.com/skyrimspecialedition it's `skyrimspecialedition`

Game Id:
  For the `game id` it's a little more complex, after open the game page, open the *Developer Tools* from your browser, go to the "Network" tab, open the search bar on Nexus and search for a Mod.
  You will see a call for a **'/mods'**, right-click and copy the url, you are going to have something similar to this: `https://api.nexusmods.com/mods?terms=armor&game_id=1704&blocked_tags=&blocked_authors=&include_adult=1`
  
  The `game id` is next to `terms`parameter.

After that go to macro config page and fill the NexusMods's script config page.
*Domain name and Game id is already filled for Skyrim Special Edition*  

### Data returned by the Script.
After the script run, the script will return a set of variables containing the data of the selected mod.
This data can be used to other parts of the macros or tempĺates.
Data can be access using the variable `{{VALUE:[data name]}}`, ex: `{{VALUE:mod_id}}` returns the id of the selected mod.
These are the available values:
```
id: The mod Id,
name: The mod name,
author: The nickname of the author,
category: The Category id from nexus mods,
summary: The small summary used in the search page,
description: The description of the mod (converted from bbcode and poor html to markdown),
picture: A hi-definition picture url,
version: Last mod Version,
created: The date that the mod was created(uploaded),
updated: The last date that the mod was updated,
adult: if the content is adult,
fileName: The mod name formated to be used as a Obsidian note title,
thumbnail: Mod Thumbail,
```

### Known bugs
- Sometimes Nexus don't return in their api of the mod has Adult content or not, case you use the value `adult` on your template, you maybe need to set manualy using `true` or `false`.

### TODO
- Improve the Conversion from BBcode to Markdown.
- Better handling of the search results.

### Credits
Credits to Jondun for his basic BBcode to Markdown Converter
https://github.com/JonDum/BBCode-To-Markdown-Converter
