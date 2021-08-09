# Dotwood.js Radio
This framework makes creating a radio bot much easier! With this module you create a basic radio bot for your server!

[![downloadsBadge](https://img.shields.io/npm/dt/dotwood.js-radio?style=for-the-badge)](https://npmjs.com/dotwood.js-radio)
[![versionBadge](https://img.shields.io/npm/v/dotwood.js-radio?style=for-the-badge)](https://npmjs.com/dotwood.js-radio)

# 💻 Installation

1. Install module: `npm i dotwood.js-radio`
2. Make a index.js file. Example:
```
const DJR = require("dotwood.js-radio");

let Radio = new DJR.Client({
    radio: "https://21253.live.streamtheworld.com/RADIO538.mp3", // Radio Steam URL
    channel: "ID", // Default voice channel id
    client: client // Your bot client
})
```

3. Event examples:
``` 
client.on("radioON", (channel) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`I successfully started the radio in ${channel}!`)
        .setColor("#00ff00")
    client.channels.cache.get("CHANNEL ID").send(embed);
});

client.on("radioOFF", () => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`The radio has stopped!`)
        .setColor("#ff0000")
    client.channels.cache.get("CHANNEL ID").send(embed);
});

client.on("streamON", (channel) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`I successfully started the stream in ${channel}!`)
        .setColor("#00ff00")
    client.channels.cache.get("CHANNEL ID").send(embed);
});
```
Change CHANNEL ID to the id of a text channel in your server

# 🤖 Other functions
- Get listeners:
```
Radio.showListeners()
```

- Adjust the volume
```
Radio.setVolume([VALUE])
```

- Destroy radio:
```
Radio.destroyRadio()
```

- Start radio:
```
Radio.playRadio()
```

- Restart radio:
```
Radio.restart()
```
- Start Youtube stream:
```
Radio.playStream()
```
# 📚 Example 1:
```
const DJR = require("dotwood.js-radio");
const Discord = require("discord.js");

let Radio = new DJR.Client({
    radio: "https://21253.live.streamtheworld.com/RADIO538.mp3", // Radio stream URL or Youtube stream URL
    channel: "ID", // Default voice channel id
    client: client // Your bot client
})

client.on("message", message => {
    if (message.author.bot || message.channel.type === "dm") return;

    var prefix = "!";

    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var arguments = messageArray.slice(1);

    // Commands
    if (command == `${prefix}volume`) {
        Radio.setVolume(arguments[0])
        let embed = new Discord.MessageEmbed()
            .setDescription(`Setted volume to ${arguments[0]}%`)
            .setColor("#00ff00")
        message.channel.send(embed)
    }

    if (command == `${prefix}destroy`) {
        Radio.destroyRadio()
        let embed = new Discord.MessageEmbed()
            .setDescription(`Stopping the radio...`)
            .setColor("#00ff00")
        message.channel.send(embed)
    }

    if (command == `${prefix}play`) {
        Radio.playRadio();
        let embed = new Discord.MessageEmbed()
            .setDescription(`Starting the radio...`)
            .setColor("#00ff00")
        message.channel.send(embed)
    }

    if (command == `${prefix}restart`) {
        Radio.restart();
        let embed = new Discord.MessageEmbed()
            .setDescription(`Restarting the radio...`)
            .setColor("#00ff00")
        message.channel.send(embed)
    }
});

client.on("radioON", (channel) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`I successfully started the radio in ${channel}!`)
        .setColor("#00ff00")
    client.channels.cache.get("CHANNEL ID").send(embed);
});

client.on("radioOFF", () => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`The radio has stopped!`)
        .setColor("#ff0000")
    client.channels.cache.get("CHANNEL ID").send(embed);
});

client.login(TOKEN);
```

# 📚 Example 2:
```
const DJR = require("dotwood.js-radio");
const Discord = require("discord.js");

let Radio = new DJR.Client({
    radio: "https://www.youtube.com/watch?v=aowKgscmTOw", // Radio stream URL or Youtube stream URL
    channel: "ID", // Default voice channel id
    client: client // Your bot client
})

client.on("message", message => {
    if (message.author.bot || message.channel.type === "dm") return;

    var prefix = "!";

    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var arguments = messageArray.slice(1);

    // Commands
    if (command == `${prefix}volume`) {
        Radio.setVolume(arguments[0])
        let embed = new Discord.MessageEmbed()
            .setDescription(`Setted volume to ${arguments[0]}%`)
            .setColor("#00ff00")
        message.channel.send(embed)
    }

    if (command == `${prefix}destroy`) {
        Radio.destroyRadio()
        let embed = new Discord.MessageEmbed()
            .setDescription(`Stopping the stream...`)
            .setColor("#00ff00")
        message.channel.send(embed)
    }

    if (command == `${prefix}play`) {
        Radio.playStream();
        let embed = new Discord.MessageEmbed()
            .setDescription(`Starting the stream...`)
            .setColor("#00ff00")
        message.channel.send(embed)
    }
});

client.on("streamON", (channel) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`I successfully started the stream in ${channel}!`)
        .setColor("#00ff00")
    client.channels.cache.get("CHANNEL ID").send(embed);
});

client.on("radioOFF", () => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`The radio has stopped!`)
        .setColor("#ff0000")
    client.channels.cache.get("CHANNEL ID").send(embed);
});

client.login(TOKEN);
```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/dotwood.js-radio/blob/main/LICENSE">Apache 2.0</a> license