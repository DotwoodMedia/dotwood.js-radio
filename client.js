const Discord = require("discord.js");
const chalk = require('chalk');

class DFClient extends Discord.Client {
    constructor(settings = {}) {
        super(settings)
        this.settings = settings;

        this.settings.token = this.settings.token ? this.settings.token : undefined;
        if (this.settings.token == undefined || this.settings.token == "") return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " Bot token is required!"));

        this.settings.radio = this.settings.radio ? this.settings.radio : undefined;
        if (this.settings.radio == undefined || this.settings.radio == "") return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " Radio url is required!"));

        this.settings.channel = this.settings.channel ? this.settings.channel : undefined;
        if (this.settings.channel == undefined || this.settings.channel == "") return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " Default join channel is required"));

        this.handlers = require("./util/handlers");

        this.on("ready", () => {
            const channel = this.channels.cache.get(this.settings.channel);
            if (channel.type !== 'voice') return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " No valid voice channel specified!"));

            channel.join().then(connection => {
                connection.voice.setSelfDeaf(true);

                this.handlers.start(this, this.settings.radio, channel)

                setInterval(() => {
                    this.user.setActivity(`${channel.members.size} listeners`, { type: "LISTENING" });
                }, 2000)
            }).catch(err => {
                console.log(err);
            })

            console.log(chalk.green(`${this.user.username} is ready to use!`));
        });
    }

    async login() {
        this.handlers.startup();
        await super.login(this.settings.token);
    }

    async destroy() {
        return this.destroy();
    }

    async setVolume(value) {
        this.handlers.volume(value);
    }

    async destroyRadio() {
        this.handlers.destroy(this);
    }

    async play() {
        const channel = this.channels.cache.get(this.settings.channel);
        if (channel.type !== 'voice') return console.log(chalk.red(chalk.bold("(Dmusicjs)") + " No valid voice channel specified!"));

        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);

            this.handlers.start(this, this.settings.radio, channel)

        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = DFClient;
