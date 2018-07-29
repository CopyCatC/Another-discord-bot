const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

var Datastore = require('nedb')
  , db_veri = new Datastore({ filename: 'memberKeys', autoload: true })
  , db_susp = new Datastore({ filename: 'suspensions', autoload: true });


bot.on("ready", async() => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity("with Crusade","https://www.twitch.tv/copycatc", {type: "STREAMING"});

  // This is going to be running every 5 seconds in the server to see if anyone can be unbanned.
  bot.setInterval((async () => {
    var right_now = new Date();
    db_susp.find({ active: true }, function (err, docs) {
      // docs = all suspensions that are still in place.
      for (let i of docs) {
        if (i.end_day >= right_now) {
          db_susp.update({ id: i._id }, { $set: { active: false } }, {}, function(err, numReplaced) {
            if(err) return console.log(err);
            unsuspend(client.server.members.get("name", i.user_ign))
            console.log(member.user.username + " has been suspended");
          })
        }
      }
    })
  }))
});

function unsuspend(member) {
  console.log(member.user.username + " has been unsuspended");
  const suspendrole = message.guild.roles.find("name", "Suspended")
  member.removeRole(suspendrole).catch(console.error)
}



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

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd.startsWith(prefix + "veri")){
    var member = args[0]
    if(member == undefined) {
      return;
    }
    // var member = message.author.username;
    console.log(member);
    message.guild.members.get(message.author.id).setNickname(member)
    var passed = true
    var messages = [];
    axios.get('https://www.realmeye.com/player/' + member)
    .then(function (response) {
      if(response.status === 200) {

        // Load in data from their realmeye
        const html = response.data;
        const $ = cheerio.load(html);

        // To see their name (This is redudant.)
        var playername = $('.entity-name').text(); // test
        if(playername.toUpperCase() !== member.toUpperCase()) {
          passed = false
          messages.push('**Private profile on realmeye.**')
        } else {
          messages.push('Private profile on realmeye.')
        }

        // To see how many characters they have.
        var playerstats = [];
        var counts = {};
        $('.player-stats').each(function() {
          playerstats.push($(this).text());
        })
        for (var i = 0; i < playerstats.length; i++) { // Count frequencies of stats
          var stat = playerstats[i];
          counts[stat] = counts[stat] ? counts[stat] + 1 : 1;
        }
        var stat_message = "**" + member + "** has ";
        var char_passed = false;
        for (var key in counts) {
          if((key == '6/8' && counts[key] >= 6) || (key == '8/8' && counts[key] >=4)) {
            char_passed = true;
            break;
          }
        }
        if(!char_passed) {
          passed = false
          messages.push('**6 Characters 6/8 or 4 Characters 8/8**')
        } else {
          messages.push('6 Characters 6/8 or 4 Characters 8/8')
        }

        // To see how much fame they have.
        var fameamount = $('tr').filter(function() {
          return  $(this).children().first().text() === 'Fame';
        }).children().last().text().replace(/ *\([^)]*\) */g, "");
        if(fameamount < 5000) {
          passed = false
          messages.push("**5000 Live Fame**")
        } else {
          messages.push("5000 Live Fame")
        }

        // To see if their location is hidden.
        var lastseen = $('.timeago').text();
        if(lastseen) {
          passed = false
          messages.push("**Private location on realmeye**")
        } else {
          messages.push("Private location on realmeye")
        }

        if(passed) {
          db_veri.find({ username: member }, function(err, docs) {
            var key = generator.generate({
              length: 8,
              numbers: true
            })
            var verify_obj = {
              username: member,
              key: key
            }
            if(docs === []) {
              db_veri.insert(verify_obj, function(err, newDoc) {
                message.author.send('**You have successfully completed the first step of the verification.**');
                message.author.send('The second step consists of adding the key to your realmeye bio. Once adding the key to your bio, please respond in #how-to-apply with !done');
                message.author.send('Key: ' + '**' + key + '**');
              })
            } else {
              db_veri.remove({ username: member }, { multi: true }, function (err, numRemoved) {
                db_veri.insert(verify_obj, function(err, newDoc) {
                  message.author.send("**A new key has been provided for you below:**");
                  message.author.send('Key: ' + "**" + key + "**")
                })
              });
            }
          })
        } else {
          message.author.send('**You currently do not have the highlighted requirements.**')
          for(var m in messages) {
            message.author.send(messages[m]);
          }
          message.author.send('You may apply again when you have achieved the requirements above.')
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  if(cmd.startsWith(prefix + "done")){
    var member = message.author.username;
    console.log(member + "submitted a !done");
    db_veri.find({ username: member }, function(err, docs) {
      console.log(docs);
      if(docs === undefined || docs.length == 0) {
        message.author.send("Sorry, we could not verify you. Please try again in 15 seconds.")
        message.author.send("If this persists, please DM a developer.")
        return;
      }
      var keyvalue = docs[0].key;
      if(!keyvalue) {
        return;
      }
      axios.get('https://www.realmeye.com/player/' + member)
      .then(function (response) {
        if(response.status === 200) {

          // Load in data from their realmeye
          const html = response.data;
          const $ = cheerio.load(html);

          var lines = [];
          var descriptions = $('.description-line').each(function(i, elem) {
            lines[i] = $(this).text()
          });
          if(lines.includes(keyvalue)) {
            // Now do whatever you want to do with that member. In this code snippet I give them role Crusade member.
            let role = message.guild.roles.find("name", "Crusade member");
            message.member.addRole(role)
                          .then(function() {
                            console.log(member + " has been successfully verified!")
                            message.author.send("You have been successfully verified!!")
                          })
                          .catch(function (error) {
                            console.log(error);
                          })
          } else {
            console.log("Verification code not found for " + member);
            message.author.send("Verification code not found in your realmeye")
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })

    })
  }


  /*
  !p1 @someone 'reason' =
  punishment tier 1 - this code will make the @someone not connect into the HQ voice chat for 2 days (2880 minutes)

  !p2 @someone 'reason' =
  punishment tier 2 - this code will make the @someone not connect into the HQ voice chat for 1 day  (1440 minutes)

  !p3 @someone 'reason' =
  punishment tier 3 - this code will make the @someone not connect into the HQ voice chat for 0.5 days (720 minutes)

  The 'reason' will be sent to the user when you do this command.
  */
  if(cmd.startsWith(prefix + "p")){
    if(!message.member.roles.some(r=>["Developer", "Founder", "Moderator", "Commander"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
    var severity = messageArray[0].slice(-1);
    var victim = message.mentions.members.first();
    var reason = messageArray.slice(2, messageArray.length).join(" ");
    if (victim) {
      const member = message.guild.member(victim);
      const suspendrole = message.guild.roles.find("name", "Suspended")
      if(member) {
        member.addRole(suspendrole).catch(console.error)
        var d = new Date();
        var doc = {
          today: d,
          reason: reason,
          user_ign: member.user.username,
          severity: severity,
          active: true,
        }
        switch(severity) {
          case "1":
            doc[end_day] = d.setMinutes(d.getMinutes() + 720);
            break;
          case "2":
            doc[end_day] = d.setMinutes(d.getMinutes() + 1440);
            break;
          case "3":
            doc[end_day] = d.setMinutes(d.getMinutes() + 2880);
            break;
          default:
            message.channel.send("Invalid severity number. Only use 1-3.")
            break;
        }
        console.log(doc);
        db_susp.insert(doc, function(err) {
          console.log(member.user.username + " has been suspended");
        })
      }
    }
  }

})

bot.login(botconfig.token);
