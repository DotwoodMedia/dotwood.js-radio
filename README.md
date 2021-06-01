# DmusicJS Framework
This framework makes creating a radio bot much easier! With this module you create a basic radio bot for your server!

<a href="https://www.npmjs.com/package/dmusicjs-framework"><img src="https://img.shields.io/npm/v/dmusicjs-framework.svg?maxAge=3600" alt="NPM version" /></a>
<a href="https://www.npmjs.com/package/dmusicjs-framework"><img src="https://img.shields.io/npm/dt/dmusicjs-framework.svg?maxAge=3600" alt="NPM downloads" /></a>

# 💻 Installation

1. Install module: `npm install dmusicjs-framework`
2. Make a index.js file. Example:
```
const DF = require("dmusicjs-framework");

let Dmusic = new DF.Client({
    token: "TOKEN", // Your bot token
    radio: "http://21273.live.streamtheworld.com/TLPSTR09.mp3", // Radio Steam URL
    channel: "ID" // Default voice channel id
})

Dmusic.login();
```

3. Create radio events. Example:
``` 
Dmusic.on("radioON", (channel) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`I successfully started the radio in ${channel}!`)
        .setColor("#00ff00")
    Dmusic.channels.cache.get("CHANNEL ID").send(embed);
});

Dmusic.on("radioOFF", () => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`The radio has stopped!`)
        .setColor("#ff0000")
    Dmusic.channels.cache.get("CHANNEL ID").send(embed);
});

```
Change CHANNEL ID to the id of a text channel in your server

# 🤖 Other functions
- Destroy bot:
```
Dmusic.Destroy()
```

- Adjust the volume
```
Dmusic.setVolume([VALUE])
```

- Destroy radio:
```
Dmusic.destroyRadio()
```

- Start radio:
```
Dmusic.play()
```
# 📚 Example:
```
const DF = require("dmusicjs-framework");

let Dmusic = new DF.Client({
    token: "TOKEN", // Your bot token
    radio: "http://21273.live.streamtheworld.com/TLPSTR09.mp3", // Radio Steam URL
    channel: "ID" // Default voice channel id
});

Dmusic.on("message", message => {
    if (message.author.bot || message.channel.type === "dm") return;

    var prefix = "!";

    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var arguments = messageArray.slice(1);

    // Commands
    if (command == `${prefix}volume`) {
        Dmusic.setVolume(arguments[0])
    }

    if (command == `${prefix}destroy`) {
        Dmusic.destroyRadio()
    }

    if (command == `${prefix}play`) {
        Dmusic.play()
    }
});

Dmusic.on("radioON", (channel) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`I successfully started the radio in ${channel}!`)
        .setColor("#00ff00")
    Dmusic.channels.cache.get("CHANNEL ID").send(embed);
});

Dmusic.on("radioOFF", () => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`The radio has stopped!`)
        .setColor("#ff0000")
    Dmusic.channels.cache.get("CHANNEL ID").send(embed);
});

Dmusic.login();
```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/dmusicjs-framework/blob/main/LICENSE">Apache 2.0</a> license