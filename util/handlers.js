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

    destroy: function (client) {
        dispatcher.destroy();
        client.emit('radioOFF');
    },

    volume: function (value) {
        dispatcher.setVolumeLogarithmic(value / 200)
    },
}