const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready!');
  client.user.setPresence({ game: { name: `on ${client.guilds.size} guilds | +help`, type: 0 } });
});

var prefix = "+";

client.on('message', message => {
  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.send("Pinging...").then(sent => {
      sent.edit(`:ping_pong: Pong! | Response Time: ${sent.createdTimestamp - message.createdTimestamp}ms`)
    })
  } else {
    if (message.content.startsWith(prefix + 'pong')) {
      message.channel.send("Ping!")
    }
  }

  if (message.content.startsWith(prefix + "kiss")) {
    let userToKiss = message.mentions.members.first()
    if (!userToKiss) {
      message.channel.send("You must specify a user to kiss!")
    } else if (message.author.id === userToKiss.id) {
      message.channel.send("Why are you kissing yourself? :face_palm:")
    } else {
      message.channel.send(`${message.author} just kissed ${userToKiss}! <3`)
    }
  }

  if (message.content.startsWith(prefix + "hug")) {
    let userToHug = message.mentions.members.first()
    if (!userToHug) {
      message.channel.send(`No one to hug? *hugs ${message.author}* <3`)
    } else if (message.author.id === userToHug.id) {
      message.channel.send("Are you kidding me? A loner? Pfff")
    } else {
      message.channel.send(`${message.author} just hugged ${userToHug}! <3`)
    }
  }

  if (message.content.startsWith(prefix + "cuddle")) {
    let userToCuddle = message.mentions.members.first()
    if (!userToCuddle) {
      message.channel.send(`No one to cuddle? *cuddles ${message.author}* <3`)
    } else if (message.author.id === userToCuddle.id) {
      message.channel.send("🔔 LONER ALERT 🔔")
    } else {
      message.channel.send(`${message.author} just cuddled with ${userToCuddle}! <3`)
    }
  }

  if (message.content.startsWith(prefix + "invite")) {
    message.reply("Would you like to invite me?\nhttps://discordapp.com/oauth2/authorize/?permissions=8&scope=bot&client_id=348656321656127488")
  }

  if (message.content.startsWith(prefix + "cookie")) {
    let giveCookieToUser = message.mentions.members.first()
    if (!giveCookieToUser) {
      message.channel.send(`I'll eat the cookie for you owo`)
    } else if (message.author.id === giveCookieToUser.id) {
      message.channel.send("Why are you giving the cookie to yourself? Loner?")
    } else {
      message.channel.send(`${message.author} just gave a cookie to ${giveCookieToUser}! 🍪`)
    }
  }

  if (message.content.startsWith(prefix + 'say')) {
    if (!["229552088525438977", "290987057399201795"].includes(message.author.id)) return;
    let args = message.content.split(' ').slice(1).join(' ')
    message.delete();
    message.channel.send(`${args}`)
  }

  if (message.content.startsWith(prefix + 'greet')) {
    let userToGreet = message.mentions.members.first()
    if (!userToGreet) {
      message.channel.send("You're not greeting anyone!")
    } else if (message.author.id === userToGreet.id) {
      message.channel.send("Uh. I'll say hi to you if you're going to be a loner, I guess.")
    } else {
      message.channel.send(`${message.author} greets ${userToGreet}! 👋`)
    }
  }
    
  if (message.content.startsWith(prefix + 'uptime')) {
      var milliseconds = parseInt((client.uptime % 1000) / 100),
       seconds = parseInt((client.uptime / 1000) % 60),
       minutes = parseInt((client.uptime / (1000 * 60)) % 60),
       hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);

       hours = (hours < 10) ? "0" + hours : hours;
       minutes = (minutes < 10) ? "0" + minutes : minutes;
       seconds = (seconds < 10) ? "0" + seconds : seconds;
      
       message.channel.send(":chart_with_upwards_trend: I've been running for** " + hours + " **hours, **" + minutes + "** minutes and **" + seconds + "." + milliseconds + "** seconds!")
  }
    
  if (message.content.startsWith(prefix + 'support')) {
      message.reply("For bot support, go to:\nhttps://discord.gg/DBKUA6D")
  }
    
  if (message.content.startsWith(prefix + 'eval')) {
  if(message.author.id !== "229552088525438977") return;
  let evall = message.content.split(' ')[0];
  let evalstuff = message.content.split(" ").slice(1).join(" ")
  try {
      const code = message.content.split(" ").slice(1).join(" ")
      let evaled = eval(code);

      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);

        const embed = new Discord.RichEmbed()
        .setTitle(`Evaluation:`)

        .setColor(0xff8c00)
        .setDescription(`:inbox_tray: Input: \n \`\`\`${evalstuff}\`\`\` \n :outbox_tray: Output: \n  \`\`\`${clean(evaled)}\`\`\``)

      message.channel.send({embed});
    } catch (err) {
      const embed = new Discord.RichEmbed()
      .setTitle(`Evaluation:`)

      .setColor(0xfc4f35)
      .setDescription(`:inbox_tray: Input: \n \`\`\`${evalstuff}\`\`\` \n :outbox_tray: Output: \n  \`\`\`${clean(err)}\`\`\``)

      message.channel.send({embed});
    }
  }

  if (message.content.startsWith(prefix + "help")) {
    message.channel.send(`\`\`\`
Category: General
  +ping
  +pong
  +kiss [user]
  +hug [user]
  +cuddle [user]
  +cookie [user]
  +greet [user]
  +invite
  +uptime
  +support

Category: Developer
  +eval [code] (Bot developer only)
  +say [args] (Bot developer only)\`\`\``)
  }
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login('your token here');
