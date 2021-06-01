const Discord = require('discord.js');
const chalk = require('chalk');

var dispatcher = "";

module.exports = {
    startup: function () {
        console.log(chalk.green(`Loading bot...`));
        console.log("");
        console.log(chalk.blue(`Created By </Pascal>#4627`));
        console.log(chalk.blue(`© Dotwood Media - 2021`));
        console.log("");
    },

    start: function (client, url, channel) {
        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);
            dispatcher = connection.play(url, {
                bitrate: '80'
            });

            client.emit('radioON', channel);
        }).catch({})
    },

    destroy: function (client) {
        dispatcher.destroy();
        client.emit('radioOFF');
    },

    volume: function (value) {
        dispatcher.setVolumeLogarithmic(value / 200)
    },
}