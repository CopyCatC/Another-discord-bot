const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();





bot.on("ready", async() => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity("with Crusade","https://www.twitch.tv/copycatc", {type: "STREAMING"});
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}hello`){
    return message.channel.send("Hello!");


  }

});

 // "\n" to skip to next line

 var responses = {Huntress: [], Knight: [], Paladin: [], Priest: [], Warrior: [], Key: [],} // Hold reactions of people. Need to reset this every time you have an afk check.
 var members = []; // members is going to hold everyone that reacted

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}sv`){
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")
    return message.channel.send("This will be a full void run, for it to begin we must have: \n16 <@&450694411173494784>             1 <:Vial:456925391286697994> / <:LHKey:456923869735813123>  \n4 <:Knight:456922478791491624>                                          4 <:Warrior:456923997083533332> \n4 <:Paladin:456922493945643008>                                          4 <:wiz:469942446483308554>   / <:ar:469942631531806740> \n          \nreaction with <:Commander:456923880297332757>  if you are able to attend. \n     \nNote: \nIf you wish to come with one of the 5 classes needed you must reaction with <:Commander:456923880297332757>  + Class. \nPlease Join  HQ voice chat in order to be moved.")
    .then(function (message){
      message.react("456925391286697994")
      message.react("456923869735813123")
      message.react("456922478791491624")
      message.react("456923997083533332")
      message.react("456922493945643008")
      message.react("469942446483308554")
      message.react("469942631531806740")
      message.react("456923880297332757")
    });
  }

});

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){

        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
          let user = msg.guild.members.get(event.d.user_id);
          if(!members.includes(user) && user.id !== bot.user.id) {
            members.push(user);
          }

          if (msg.author.id == bot.user.id){ // This IF is only if people react to a message from the bot.
              var char_select = responses[event.d.emoji.name] // event.d.emoji.name specifies the emoji that was reacted on message.

              if (user.id != bot.user.id){ // Only pull real people and not the bot.
                var memberObj = msg.guild.members.get(user.id);

                  if (event.t === "MESSAGE_REACTION_ADD"){
                    responses[event.d.emoji.name].push(memberObj.user.username) // Move the user to that character.
                      // memberObj.addRole(roleObj)
                  } else {
                    var search_index = char_select.indexOf(memberObj.user.username)
                    if(search_index !== -1) {
                      char_select.splice(search_index, 1)
                      responses[event.d.emoji.name] = char_select
                      // memberObj.removeRole(roleObj);
                    }
                  }
              }
          }
        })

    }
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}ss`){
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")
    return message.channel.send("This will be a Split Run \n16 <@&450694411173494784>             1 <:Vial:456925391286697994> / <:LHKey:456923869735813123>  \n4 <:Knight:456922478791491624>                                          4 <:Warrior:456923997083533332> \n4 <:Paladin:456922493945643008>                                          3 <:wiz:469942446483308554>   / <:ar:469942631531806740> \n          \nreaction with <:Commander:456923880297332757>  if you are able to attend. \nreaction with <:TioArgus:456924651679907840>  if you wish to go to cultist. \n     \nNote: \nIf you wish to come with one of the 5 classes needed you must reaction with <:Commander:456923880297332757>  + Class. \nIf you reaction with one of the 4 classes needed you must not go to cultist. \nIf you wish to go to cultist reaction with <:Commander:456923880297332757> + <:TioArgus:456924651679907840>")
    .then(function (message){
      message.react("456925391286697994")
      message.react("456923869735813123")
      message.react("456922478791491624")
      message.react("456923997083533332")
      message.react("456922493945643008")
      message.react("469942446483308554")
      message.react("469942631531806740")
      message.react("456923880297332757")
      message.react("456924651679907840")
    });
  }

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}sve`){
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")
    return message.channel.send("This will be a full elite void run, for it to begin we must have \n8 <@&470254676231716864>                  1 <:Vial:456925391286697994> / <:LHKey:456923869735813123>  \n2 <:Knight:456922478791491624>                                          2 <:Warrior:456923997083533332> \n2 <:Paladin:456922493945643008>                                          2 <:wiz:469942446483308554>   / <:ar:469942631531806740> \n          \nreaction with <:Commander:456923880297332757>  if you are able to attend. \n     \nNote: \nIf you wish to come with one of the 5 classes needed you must reaction with <:Commander:456923880297332757>  + Class.")
    .then(function (message){
      message.react("456925391286697994")
      message.react("456923869735813123")
      message.react("456922478791491624")
      message.react("456923997083533332")
      message.react("456922493945643008")
      message.react("469942446483308554")
      message.react("469942631531806740")
      message.react("456923880297332757")
    });
  }

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}sse`){
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")
    return message.channel.send("This will be a Elite Split Run, \nfor it to begin we must have: \n15 <@&470254676231716864>             1 <:Vial:456925391286697994> / <:LHKey:456923869735813123>  \n4 <:Knight:456922478791491624>                                          4 <:Warrior:456923997083533332> \n4 <:Paladin:456922493945643008>                                          3 <:wiz:469942446483308554>   / <:ar:469942631531806740> \n          \nreaction with <:Commander:456923880297332757>  if you are able to attend. \nreaction with <:TioArgus:456924651679907840>  if you wish to go to cultist. \n     \nNote: \nIf you wish to come with one of the 5 classes needed you must reaction with <:Commander:456923880297332757>  + Class. \nIf you reaction with one of the 4 classes needed you must not go to cultist. \nIf you wish to go to cultist reaction with <:Commander:456923880297332757> + <:TioArgus:456924651679907840>")
    .then(function (message){
      message.react("456925391286697994")
      message.react("456923869735813123")
      message.react("456922478791491624")
      message.react("456923997083533332")
      message.react("456922493945643008")
      message.react("469942446483308554")
      message.react("469942631531806740")
      message.react("456923880297332757")
      message.react("456924651679907840")
    });
  }

});


bot.on('message', async message => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

    if(cmd === `${prefix}mq`){
      message.delete().catch(O_o=>{});
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")
      var msg = message.channel.send("Moving!")
      var people = bot.channels.get("471667509020327948").members.array();
      var promises = [];
      people.forEach(person => {
      promises.push(person.setVoiceChannel("450706830168162304"));
      });
      Promise.all(promises);
  }
});

bot.on('message', async message => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

    if(cmd === `${prefix}mqe`){
      message.delete().catch(O_o=>{});
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")
      var msg = message.channel.send("Moving!")
      var people = bot.channels.get("471685192554119180").members.array();
      var promises = [];
      people.forEach(person => {
      promises.push(person.setVoiceChannel("470254461852450857"));
      });
      Promise.all(promises);
  }
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}feedback`){
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission")
    return message.channel.send(`Give ${message.author} a <:gold:469937556172177431> if they where good, give them a <:silver:469937643749376020>  if the where meh, or give them a <:bronze:469937408658636851> if they where bad. `)
    .then(function (message){
      message.react("469937556172177431")
      message.react("469937643749376020")
      message.react("469937408658636851")
    });
  }

});

bot.login(botconfig.token);
