- [1. Introduction](#1-introduction)
- [2. Technologies :](#2-technologies-)
- [3. Webhooks](#3-webhooks)
- [3. Hébergement :](#3-hébergement-)
- [4. Creation de l'application et du BOT sur Discord](#4-creation-de-lapplication-et-du-bot-sur-discord)
- [5. Api avec Express.js](#5-api-avec-expressjs)
  - [5.1 Discord.js](#51-discordjs)
  - [5.2 Routage avec express.Router](#52-routage-avec-expressrouter)
  
# 1. Introduction

**Capitaine Crochet** est un BOT Discord créé pour centraliser les notifications en provenance de netlify et de github sur deux channels discord de notre serveur privé.

Avantage : il permet d'informer tous les collaborateurs d'un projet sur l'état du déploiement d'un site sur Netlify (pour contourner le fait que l'ajout de collaborateurs est payant).

**Capitaine Crochet** envoie, sur les channels auxquels il a accès : 
- des notifications concernant le deploiement de l'app sur netlify (build started, failed ou success)
- des notifications sur les push, les pull request et les merge sur le repository github

# 2. Technologies : 

L'appli a été développée avec **Node.js**, plateforme logicielle libre en JavaScript, orientée vers les applications réseau scalables. Parmi les modules natifs de Node.js, on retrouve http qui permet le développement de serveur HTTP. Il est donc possible de se passer de serveurs web tels que Nginx ou Apache lors du déploiement de sites et d'applications web développés avec Node.js.

La partie serveur est développée avec **ExpressJS**, une infrastructure d'applications Web Node.js minimaliste et flexible qui fournit un ensemble de fonctionnalités robuste pour les applications Web et mobiles.
Grâce à plusieurs méthodes utilitaires HTTP la création d'une API robuste est simple et rapide.

L'appli utilise enfin le package **Discord.JS** qui permet d'intéragir facilement avec l'api de Discord et utiliser ses différentes fonctionnalités.
https://discord.js.org/#/

# 3. Webhooks

Plusieurs routes crées avec le **Router Express** permettent l'utilisation de Webhooks sur Netlify et Github :
 - Les *webhooks github* permettent, lorsqu'un événements est déclenché sur un repository (push, pull request, merge...), d'envoyer une requête HTTP POST à l'URL configurée du webhook. Les webhooks peuvent être utilisés pour mettre à jour un outil de suivi des problèmes externe, déclencher des builds CI, mettre à jour un miroir de sauvegarde ou même déployer sur votre serveur de production. 
  https://docs.github.com/en/developers/webhooks-and-events/about-webhooks
- Sur Netlify, on utilise les *Webhooks sortants*. Ce type de notification permet d'envoyer des informations d'événement à une URL arbitraire à l'aide d'une requête POST. Le corps de la demande de webhook sortante aura une représentation JSON de l'objet pertinent pour l'événement.
  https://docs.netlify.com/site-deploys/notifications/#outgoing-webhooks

# 3. Hébergement :

L'appli est  sur **Heroku**, une PaaS (Plateform as a Service) qui permet d'héberger des applications sur le Cloud. L'avantage est surtout de pouvoir  déployer automatiquement les applications depuis des repos en ligne, hébergés sur Github par exemple.

# 4. Creation de l'application et du BOT sur Discord

 - création d'une application dans la section "développeurs" de Discord, section Applications
  https://discord.com/developers/applications
 - ajout d'un BOT dans la partie BOT de l'application.
 - L'ID de l'application ajouté dans l'URL suivant permet d'accéder à la liste des serveurs où l'on souhaite ajouter le BOT : https://discord.com/oauth2/authorize?client_id=YOUR_APP_ID&scope=bot

# 5. Api avec Express.js

## 5.1 Discord.js

L'app express utilise le node module **discord.js** et instancie un Client.

Il faut ensuite se connecter au BOT grâce au token disponible et récupérer les channels sur lesquels le BOT va pouvoir envoyer des messsages

```js
const Discord = require('discord.js');
const client = new Discord.Client();


client.login('token'); 

client.on('ready', () => {
    
    const channels = client.channels.cache.array();
    ...
})

```
## 5.2 Routage avec express.Router

Deux routeurs Express sont utilisés pour construire les endpoints de l'api suivants : 
- pour github : github/push et github/pull
- pour netlify : netlify/fail, netlify/success, netlify/started 

A chaque push ou pull request sur le repository github concerné, les webhooks envoient des requetes HTTP POST sur les urls spécifiées.

Chaque route appelle une fonction spécifique qui récupère les informations souhaitées dans le corps de la requete POST et appelle la fonction send (propre à  Discord) pour envoyer un message sur le channel Discord désiré.

Exemple de la requete POST pour les notifications de "push" :

```js

// récupération des informations dans le body de la requête :
    const message = req.body.head_commit.message;
    const name = req.body.pusher.name;
    const repo = req.body.repository.name;
    const date = req.body.head_commit.timestamp;

// si le webhook a été déclenché par le merge de deux branches :

    if(message.includes('Merge')){
        console.log('#### merge notification ###');

        // création d'un message qui sera affiché sous forme de carte par Discord, avec différents champs

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("MERGED")
            .addField("Repo : ", repo)
            .addField("Message du merge : ", message || "Aucun contenu")
            .addField("Date : ", date);
            chan.github_channel.send(embed);
            
        res.json({
            text: "test"
        })

    // si c'est le push d'une branche locale qui a déclenché le webhook :
    } else {
        console.log('#### push notification request OK ###');
        const embed = new MessageEmbed()
            .setColor("YELLOW")
            .setTitle("PUSH")
            .addField("Repo : ", repo)
            .addField("Auteur du push : ", name)
            .addField("Message du commit : ", message || "Aucun contenu")
            .addField("Date : ", date);
            chan.github_channel.send(embed);
            
        res.json({
            text: "test"
        })
    }
}
```

# 6. Schéma de l'application

<img width="1238" alt="Capture d’écran 2021-05-18 à 09 16 08" src="https://user-images.githubusercontent.com/68015537/118608303-da0c3d00-b7b9-11eb-9dea-ceb545ab6eca.png">
