---
skyrim_mod_name: "Skyrim Flora Overhaul SE"
skyrim_mod_thumbnail: "![thumb](https://staticdelivery.nexusmods.com/mods/1704/images/thumbnails/2154/2154-1673221547-2065443795.png)"
skyrim_mod_id: "2154"
skyrim_mod_summary: "* 18 new tree models (replacements of default trees)<br />* ~65 new grasses and plants<br />* The green forest appear more deep and old - trees are much taller and wider.<br />* Snowy trees are much more detailed with heavy snow, some are bent by the snow"
skyrim_mod_last_update: "2023-02-17T17:05:58.000+00:00"
skyrim_mod_tags:
---
# Mod Description
  **## F## eatures**

<br />*** 16 new tree models (replaces most of the default trees)
<br />
<br />* 3D LODs
<br />
<br />* 180+ new textures for trees, plants, grasses
<br />
<br />* 65+ new grasses and plant models
<br />
<br />* Each of the various ground textures will spawn 7 different grasses instead of 2 (default)**
<br />
<br />
<br />**## F.## A.Q
<br />
<br />
<br />**Q: I sometimes have immense stutter / FPS drop!
<br />A: From the user GregR: "on the off chance that you are using a controller and Steam, I have seen stutter and framerate dropping over a few hours of play. If so unplugging and replugging the controller fixed it in the moment. Though what solved it for me completely was going into Steam (big picture mode) and managing the game and under controller options, unchecking "Use Steam Configuration for non-Steam Controllers". 
<br />
<br />Q: How do i use DynDoLOD 3 to generate 3D LOD's for No Grass version?
<br />A: Please read [this](https://stepmodifications.org/forum/topic/15606-dyndolod-300-alpha-33/)
<br />These images are also helpful (thanks to [z929669](https://forums.nexusmods.com/index.php?/user/122117-z929669/) for images + creation of 3D LODS!)
<br />Edit: **OUTDATED
<br />**[spoiler]
<br />![https://i.imgur.com/TSEjfTq.jpg](https://i.imgur.com/TSEjfTq.jpg)
<br />![https://i.imgur.com/zURMSFu.jpg](https://i.imgur.com/zURMSFu.jpg)
<br />[/spoiler]
<br />
<br />Q: Do i have to edit some .ini to get all ground covers?
<br />A: I have included a skyrim flora overhaul.ini for the main version that should take care of it.
<br />It's settings are:
<br />[Grass]
<br />iMaxGrassTypesPerTexure=7
<br />iMinGrassSize=20
<br />
<br />
<br />Q: Can i make an xbox version?
<br />A: Sorry, no.  
<br />I don't allow this because 1) I don't own xbox so i can't test it or make tweaks and whatnot. Even on PC this can be a really demanding mod, xbox would likely need a less demanding version. 2) I am not comfortable leaving the mod in the hands of someone else. I prefer full control myself to e.g patch, remove stuff i'm not happy with etc. 3) I am currently not very satisfied with the mod overall, so obviously i'm not interested in it being ported either. Thanks for understanding and thanks for not PM'ing me about it.
<br />
<br />
<br />Q: The LOD's in the distance look like they have been scissored in half?!
<br />A: You have a LOD that isn't compatible with my MOD which comes with it's own LOD for trees. So make sure you have no other mod(s) that is adding a tree LOD which overrides mine. This is the location for the tree LOD file: *...&#92;Steam&#92;steamapps&#92;common&#92;Skyrim Special Edition&#92;Data&#92;Textures&#92;terrain&#92;tamriel&#92;trees* make sure this file is the same as in the archive. If not you can extract the file from the SFO archive and overwrite the file in this folder.
<br />
<br />Q: The Grass is really tiny / it's less grass than vanilla!
<br />A: Make sure you haven't done any "strange" edits to your ini files. If you are using MO 2 as your mod organizer it has its own .ini files, make sure they are edited correctly. Also, both Skyrim.ini and skyrimprefs.ini can both be deleted from your *my documents/my games/skyrim special edition* folder and the game will create new ones from scratch, this can often be helpful in these situations.
<br />
<br />Q: What is the performance impact?
<br />A: Quite big. Depending on the area it gives me -1 to -10 less FPS. (Nvidia 980ti, i7 @4.7GHz). 
<br />Avoid this mod if you are struggling with FPS already. However performance can change in the future, check back again :)
<br />
<br />Q: The mod doesn't install, it gets stuck in NMM!
<br />A: Some things that might help are: disable real-time antivirus, run NMM as Admin, restart NMM, download and install the mod manually: ( https://staticdelivery.nexusmods.com/mods/1704/images/2154-0-1478104091.jpg )
<br />
<br />Q: The grass in the tundra is not tall, can you change it?
<br />A: No, it's a tundra, it's supposed to look like that. Use google, search for fall tundra.
<br />
<br />Q: The trees are shaking, why?
<br />A: WInd animations. They are not perfect and difficult to tweak.
<br />
<br />Q: The grass cuts in a line where it goes from lush to no grass, any fix?
<br />A: If you have a line in the .ini that says "IGrassCellRadius=2" (or similar) delete it.
<br />
<br />Q: There's a bug where flora (lupins, some bushes) sometimes disappears from the screen when you look up or when they reach the sides of the screen.
<br />A: Yes. There is no fix for this, a problem with the engine it seems. It's nothing too serious since it doesnt happen very often.
<br />
<br />Q: Is this mod "4K"?
<br />A: No. Textures range from 512x512 to 4096x4096, it will depend on the texture. 
<br />
<br />Q: what should i install? Everything in downloads?
<br />A: "main files" are the stand-alone mods, they can not be mixed together. Other files are patches or addons, so no you dont need them, but i would recommend to use files in "updates".
<br />
<br />Q: How can i get more dense grass? / How can i get better performance?
<br />A1: You edit the iMinGrassSize value in skyrim flora overhaul.ini (in data). A value of 10 will give you very dense grass at the cost of performance, higher values means less grass and better performance. iMinGrassSize=50 will give low-end computer a FPS boost but the grasses will be rather "patchy". 
<br />A2: You might want to change Shadow Quality to High instead of Ultra, this mod is particularly taxing with shadows since each tree branch will cast a shadow. Some users have reported a whole 30 FPS increase with turning it to "high".
<br />A3: Use 2K textures under "optional files".
<br />
<br />Q: I uninstalled it, now have purple trees!
<br />A: Delete the trees folder ( &#92;Data&#92;Meshes&#92;Landscape&#92;Trees)
<br />
<br />
<br />**## [b]Other mods i've made that you might enjoy:[
<br />Summer Edition II](https://www.nexusmods.com/skyrimspecialedition/mods/24957)** 
<br />**[Bent Pines II](http://www.nexusmods.com/skyrimspecialedition/mods/8306)**[/b]