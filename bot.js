const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');//lrowsxrd
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "lrowsxrd");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);//lordcreative
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);//lrowsxrd
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;//lrowsxrd
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //lrowsxrd//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│2 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(2)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│3 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(3)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│4 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(4)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│5 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(5)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------Public Sunucu Sistemi----------------------------// 
client.on('message', async message => {
  const ms = require('ms');
  const prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "lrows-public-kur") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Public Sunucunun Kurulmasından Eminseniz **Kur** Yazmanız Yeterli Olacaktır.`)
      message.channel.awaitMessages(response => response.content === 'Kur', {
        max: 1,
        time: 10000,
        errors: ['time'],
     })
    .then((collected) => {

message.guild.createChannel('【BILGILENDIRME】', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`📋・kurallar`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【BILGILENDIRME】")))
        
        message.guild.createChannel(`📢・duyurular`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【BILGILENDIRME】")))
        
        message.guild.createChannel(`🎁・boost-bilgi`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【BILGILENDIRME】")))
        
        message.guild.createChannel(`🎉・cekilis`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【BILGILENDIRME】")))
        
        message.guild.createChannel(`📕・bilgilendirme`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【BILGILENDIRME】")))
        
                message.guild.createChannel(`📤・gelen-giden`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【BILGILENDIRME】")))
        
                        message.guild.createChannel(`📝・yetkili-basvuru`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【BILGILENDIRME】")))
        
        message.guild.createChannel('【CEZA BİLGİ】', 'category', [{
  id: message.guild.id,
}]);
        
                                message.guild.createChannel(`📝・neden-ceza-alırım`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【CEZA BİLGİ】")))
        
                                        message.guild.createChannel(`📝・mute-bilgi`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【CEZA BİLGİ】")))
        
                                               message.guild.createChannel(`📝・ban-bilgi`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【CEZA BİLGİ】")))
        
                message.guild.createChannel('【GENEL】', 'category', [{
  id: message.guild.id,
}]);
        
        message.guild.createChannel(`💬・sohbet`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【GENEL】")))
        
                message.guild.createChannel(`🤖・bot-komut`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【GENEL】")))
        
        message.guild.createChannel(`📷・foto-chat`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【GENEL】")))
        
                        message.guild.createChannel('【OTHER TEXT】', 'category', [{
  id: message.guild.id,
}]);
        
                message.guild.createChannel(`🐟・burc-hakkinda`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【OTHER TEXT】")))
        
        message.guild.createChannel(`🐟・haftalik-burc-yorumlari`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【OTHER TEXT】")))
        
        message.guild.createChannel(`🎲・gune-soz-birak`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【OTHER TEXT】")))
        
        message.guild.createChannel(`📚・oneri-istek-sikayet`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【OTHER TEXT】")))
        
        message.guild.createChannel(`⭐️・sorun-cozme-chat`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【OTHER TEXT】")))
        
        message.guild.createChannel('【SESLİ SOHBET】', 'category', [{
  id: message.guild.id,
}]);
        
      message.guild.createChannel(`🔊・Genel Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
        message.guild.createChannel(`🔊・Genel Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
        message.guild.createChannel(`🔊・2 Kişilik Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
        message.guild.createChannel(`🔊・2 Kişilik Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
        message.guild.createChannel(`🔊・3 Kişilik Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
        message.guild.createChannel(`🔊・3 Kişilik Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
        message.guild.createChannel(`🔊・4 Kişilik Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
        message.guild.createChannel(`🔊・5 Kişilik Sohbet `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【SESLİ SOHBET】")))
        
                message.guild.createChannel('【MUZIK KANALLARI】', 'category', [{
  id: message.guild.id,
}]);
        
        message.guild.createChannel(`🎶・Müzik Odası `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【MUZIK KANALLARI】")))
        
                message.guild.createChannel(`🎶・Müzik Odası `, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【MUZIK KANALLARI】")))
        
                        message.guild.createChannel('【VALORANT】', 'category', [{
  id: message.guild.id,
}]);
        
                        message.guild.createChannel(`🎮・Valorant`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【VALORANT】")))
        
        message.guild.createChannel(`🎮・Valorant`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【VALORANT】")))
        
                                message.guild.createChannel('【CS:GO】', 'category', [{
  id: message.guild.id,
}]);
        
                message.guild.createChannel(`🎮・CS:GO REKABETCİ`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【CS:GO】")))
        
        message.guild.createChannel(`🎮・CS:GO REKABETCİ`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【CS:GO】")))
        
        message.guild.createChannel(`🎮・CS:GO YOLDAŞ`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【CS:GO】")))
        
        message.guild.createChannel('【LOL】', 'category', [{
  id: message.guild.id,
}]);
        
      message.guild.createChannel(`🎮・LOL ODASI`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【LOL】")))
        
        message.guild.createChannel(`🎮・LOL ODASI`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "【LOL】")))
        
        
        
        

       message.channel.send("Public Sunucunuz Kuruldu !")
     
            })   
      
}
});
//----------------------------------Public Sunucu Kurma Sistemi Son----------------------------// 