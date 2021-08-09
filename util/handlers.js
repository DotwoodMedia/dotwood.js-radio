const ytdl = require("ytdl-core");
const ytsr = require('youtube-sr').default;

var dispatcher = "";

module.exports = {
    start: function (client, url, channel) {
        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);
            dispatcher = connection.play(url, {
                bitrate: '80'
            });

            client.emit('radioON', channel);
        }).catch({})
    },

    streamStart: function (client, url, channel) {
        const video = ytsr.validate(url, 'VIDEO');
        if (video == true) {
            channel.join().then(connection => {
                connection.voice.setSelfDeaf(true);
                dispatcher = connection.play(ytdl(url), {
                    bitrate: '80'
                });

                client.emit('streamON', channel);
            }).catch({})
        }
        else {
            throw new Error(`No valid Youtube URL specified!`);
        }
    },

    destroy: function (client) {
        dispatcher.destroy();
        client.emit('radioOFF');
    },

    volume: function (value) {
        dispatcher.setVolumeLogarithmic(value / 200)
    },
}