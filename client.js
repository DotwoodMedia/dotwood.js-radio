class DFClient {
    constructor(settings = {}) {
        this.settings = settings;

        this.settings.client = this.settings.client ? this.settings.client : undefined;
        if (this.settings.client == undefined || this.settings.client == "") throw new Error(`Client is required!`);

        this.settings.radio = this.settings.radio ? this.settings.radio : undefined;
        if (this.settings.radio == undefined || this.settings.radio == "") throw new Error(`Radio url is required!`);

        this.settings.channel = this.settings.channel ? this.settings.channel : undefined;
        if (this.settings.channel == undefined || this.settings.channel == "") throw new Error(`Default join channel is required!`);

        this.handlers = require("./util/handlers");
    }

    async setVolume(value) {
        this.handlers.volume(value);
    }

    async destroyRadio() {
        this.handlers.destroy(this);
    }

    async showListeners() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'voice') throw new Error(`No valid voice channel specified!`);

        return channel.members.size;
    }

    async playRadio() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'voice') throw new Error(`No valid voice channel specified!`);

        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);

            this.handlers.start(client, this.settings.radio, channel)

        }).catch(err => {
            console.log(err);
        })
    }

    async playStream() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'voice') throw new Error(`No valid voice channel specified!`);

        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);

            this.handlers.streamStart(client, this.settings.radio, channel)

        }).catch(err => {
            console.log(err);
        })
    }

    async restart() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'voice') throw new Error(`No valid voice channel specified!`);

        channel.leave();

        setTimeout(() => {
            channel.join().then(connection => {
                connection.voice.setSelfDeaf(true);

                this.handlers.start(client, this.settings.radio, channel)

            }).catch(err => {
                console.log(err);
            })
        }, 1000)
    }
}

module.exports = DFClient;