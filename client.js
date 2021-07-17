const chalk = require('chalk');

class DFClient {
    constructor(settings = {}) {
        this.settings = settings;

        this.settings.client = this.settings.client ? this.settings.client : undefined;
        if (this.settings.client == undefined || this.settings.client == "") return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " Client is required!"));

        this.settings.radio = this.settings.radio ? this.settings.radio : undefined;
        if (this.settings.radio == undefined || this.settings.radio == "") return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " Radio url is required!"));

        this.settings.channel = this.settings.channel ? this.settings.channel : undefined;
        if (this.settings.channel == undefined || this.settings.channel == "") return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " Default join channel is required"));

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
        if (channel.type !== 'voice') return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " No valid voice channel specified!"));

        return channel.members.size;
    }

    async play() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'voice') return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " No valid voice channel specified!"));

        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);

            client.handlers.start(client, this.settings.radio, channel)

        }).catch(err => {
            console.log(err);
        })
    }

    async restart() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'voice') return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " No valid voice channel specified!"));

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