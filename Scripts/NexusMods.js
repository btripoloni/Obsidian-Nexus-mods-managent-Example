const notice = (msg) => new Notice(msg, 5000);
const log = (msg) => console.log(msg);

const API_KEY_OPTION = "Personal Nexus API Key";
const API_URL = "https://api.nexusmods.com/";

module.exports = {
  entry: start,
  settings: {
    name: "Skyrim NexusMods Searcher",
    author: "Bruno Tripoloni",
    options: {
      [API_KEY_OPTION]: {
        type: "text",
        defaultValue: "",
        placeholder: "Personal Nexus API Key",
      },
      Game: {
        type: "text",
        defaultValue: "skyrimspecialedition",
      },
      "Game ID": {
        type: "text",
        defaultValue: "1704",
      },
      "Adult content": {
        type: "checkbox",
        defaultValue: true,
      },
    },
  },
};

let QuickAdd;
let Settings;

async function start(params, settings) {
  QuickAdd = params;
  Settings = settings;

  const query = await QuickAdd.quickAddApi.inputPrompt(
    "Enter Mod Name or Mod ID: "
  );
  if (!query) {
    notice("No query entered.");
    throw new Error("No query entered.");
  }

  const isQueryId = isNexusModId(query);
  let selectedMod;
  let modThumbnailPath;
  if (isQueryId) {
    selectedMod = await getByModId(query);
    modThumbnailPath = selectedMod.picture_url;
  } else {
    const results = await getByQuery(query);
    const choice = await QuickAdd.quickAddApi.suggester(
      results.map(formatTitleForSuggestion),
      results
    );
    // console.log(choice);
    if (!choice) {
      notice("No choice selected.");
      throw new Error("No choice selected.");
    }
    selectedMod = await getByModId(choice.mod_id);
    console.log("choice", choice);
    modThumbnailPath = `https://staticdelivery.nexusmods.com${choice.image}`;
  }

  console.log("mod", selectedMod);

  QuickAdd.variables = {
    id: selectedMod.mod_id,
    name: selectedMod.name,
    author: selectedMod.author,
    category: selectedMod.category_id,
    summary: selectedMod.summary,
    description: NexusBBcodeToObsidianMarkdown(selectedMod.description),
    picture: selectedMod.picture_url,
    version: selectedMod.version,
    created: selectedMod.created_time,
    updated: selectedMod.updated_time,
    adult: selectedMod.contains_adult_content,
    fileName: replaceIllegalFileNameCharactersInString(selectedMod.name),
    thumbnail: modThumbnailPath,
  };
  console.log(QuickAdd.variables);
}

function isNexusModId(str) {
  return /\d+$/.test(str);
}

function formatTitleForSuggestion(resultItem) {
  return `${resultItem.name} by (${resultItem.username})`;
}

async function getByQuery(query) {
  const searchResults = await apiGet("/mods/", {
    terms: query,
    game_id: Settings["Game ID"],
    include_adult: Settings["Adult content"],
  });
  if (!searchResults.results || !searchResults.results.length) {
    notice("No results found.");
    throw new Error("No results found.");
  }

  return searchResults.results;
}

async function getByModId(id) {
  const path = `v1/games/${Settings["Game"]}/mods/${id}.json`;
  const res = await apiGet(path);

  if (!res) {
    notice("No results found.");
    throw new Error("No results found.");
  }

  return res;
}

function linkifyList(list) {
  if (list.length === 0) return "";
  if (list.length === 1) return `\n  - "[[${list[0]}]]"`;

  return list.map((item) => `\n  - "[[${item.trim()}]]"`).join("");
}

function replaceIllegalFileNameCharactersInString(string) {
  return string.replace(/[\\,#%&\{\}\/*<>$\'\":@]*/g, "");
}

async function apiGet(path = "/", data) {
  let finalURL = new URL(path, API_URL);
  if (data)
    Object.keys(data).forEach((key) =>
      finalURL.searchParams.append(key, data[key])
    );

  // finalURL.searchParams.append("apikey", Settings[API_KEY_OPTION]);

  const res = await request({
    url: finalURL.href,
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      apikey: Settings[API_KEY_OPTION],
    },
  });

  return JSON.parse(res);
}

function NexusBBcodeToObsidianMarkdown(bbcode) {
  // Substitui tags BBCode por Markdown
  //   var left = bbcode;
  //   var right = document.getElementById('right_ta');

  var left_value = bbcode;

  //preprocessing for tf2toolbox BBCode
  if (left_value.search(/TF2Toolbox/gim) != -1) {
    left_value = left_value
      .replace(
        /(\(List generated at .+?\[\/URL\]\))((?:.|\n)+)/gim,
        "$2\n\n\n$1"
      ) //Move TF2Toolbox link to bottom
      .replace("(List generated at", "(List generated from")
      .replace(/[^\S\n]+\(List/gim, "(List")
      .replace(/\[b\]\[u\](.+?)\[\/u\]\[\/b\]/gim, "[b]$1[/b]\n") //Fix double emphasized titles
      .replace(/(\n)\[\*\]\[b\](.+?)\[\/b\]/gim, "$1[*] $2");
  }

  //general BBcode conversion
  left_value = left_value
    .replace(/\[b\]((?:.|\n)+?)\[\/b\]/gim, "**$1**") //bold; replace [b] $1 [/b] with ** $1 **
    .replace(/\[\i\]((?:.|\n)+?)\[\/\i\]/gim, "*$1*") //italics; replace [i] $1 [/u] with * $1 *
    .replace(/\[\u\]((?:.|\n)+?)\[\/\u\]/gim, "$1") //remove underline;
    .replace(/\[s\]((?:.|\n)+?)\[\/s\]/gim, "~~ $1~~") //strikethrough; replace [s] $1 [/s] with ~~ $1 ~~
    .replace(/\[center\]((?:.|\n)+?)\[\/center\]/gim, "$1") //remove center;
    .replace(/\[quote\=.+?\]((?:.|\n)+?)\[\/quote\]/gim, "$1") //remove [quote=] tags
    .replace(/\[size\=.+?\]((?:.|\n)+?)\[\/size\]/gim, "## $1") //Size [size=] tags
    .replace(/\[color\=.+?\]((?:.|\n)+?)\[\/color\]/gim, "$1") //remove [color] tags
    .replace(
      /\[list\=1\]((?:.|\n)+?)\[\/list\]/gim,
      function (match, p1, offset, string) {
        return p1.replace(/\[\*\]/gim, "1. ");
      }
    )
    .replace(/(\n)\[\*\]/gim, "$1* ") //lists; replcae lists with + unordered lists.
    .replace(/\[\/*list\]/gim, "")
    .replace(/\[img\]((?:.|\n)+?)\[\/img\]/gim, "![$1]($1)")
    .replace(/\[url=(.+?)\]((?:.|\n)+?)\[\/url\]/gim, "[$2]($1)")
    .replace(/\[code\](.*?)\[\/code\]/gim, "`$1`")
    .replace(
      /\[code\]((?:.|\n)+?)\[\/code\]/gim,
      function (match, p1, offset, string) {
        return p1.replace(/^/gim, "    ");
      }
    )
    .replace(/\[php\](.*?)\[\/php\]/gim, "`$1`")
    .replace(
      /\[php\]((?:.|\n)+?)\[\/php\]/gim,
      function (match, p1, offset, string) {
        return p1.replace(/^/gim, "    ");
      }
    )
    .replace(/\[pawn\](.*?)\[\/pawn\]/gim, "`$1`")
    .replace(
      /\[pawn\]((?:.|\n)+?)\[\/pawn\]/gim,
      function (match, p1, offset, string) {
        return p1.replace(/^/gim, "    ");
      }
    )
    .replace("<br />", "")
    .replace(
      /\[youtube\](.*?)\[\/youtube\]/gim,
      "`<iframe width='560' height='315' src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0'></iframe>`"
    );

  //post processing for tf2toolbox BBCode
  if (left_value.search(/TF2Toolbox/gim) != -1) {
    left_value = left_value
      .replace(
        "/bbcode_lookup.php))",
        "/bbcode_lookup.php) and converted to /r/tf2trade ready Markdown by Dum's [converter](http://jondum.github.com/BBCode-To-Markdown-Converter/))."
      ) //add a linkback
      .replace(/\*\*.+?\*\*[\s]+?None[\s]{2}/gim, ""); //remove empty sections
  }

  return left_value;
}
