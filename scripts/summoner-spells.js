﻿var summoners = {
    "data": {
        "SummonerBoost": {
            "range": "self",
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerBoost.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 48
            },
            "cost": [0],
            "cooldown": [210],
            "summonerLevel": 6,
            "id": 1,
            "vars": [{
                "link": "@text",
                "coeff": [3],
                "key": "f1"
            }],
            "sanitizedDescription": "Removes all disables and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
            "rangeBurn": "self",
            "costType": "NoCost",
            "cooldownBurn": "210",
            "description": "Removes all disables and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
            "name": "Cleanse",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ARAM",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Removes all disables and summoner spell debuffs affecting your champion and reduces the duration of disables by 65% for the next {{ f1 }} seconds.",
            "key": "SummonerBoost",
            "costBurn": "0",
            "tooltip": "Removes all disables and summoner spell debuffs affecting your champion and reduces the duration of disables by 65% for the next {{ f1 }} seconds."
        },
        "SummonerTeleport": {
            "range": [25000],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerTeleport.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 48,
                "x": 144
            },
            "cooldown": [300],
            "cost": [0],
            "summonerLevel": 6,
            "id": 12,
            "vars": [{
                "link": "@text",
                "coeff": [4],
                "key": "f1"
            }],
            "sanitizedDescription": "After channeling for 3.5 seconds, teleports your champion to target allied structure, minion, or ward.",
            "rangeBurn": "25000",
            "costType": "NoCost",
            "cooldownBurn": "300",
            "description": "After channeling for 3.5 seconds, teleports your champion to target allied structure, minion, or ward.",
            "name": "Teleport",
            "modes": [
               "CLASSIC",
               "TUTORIAL"
            ],
            "sanitizedTooltip": "After channeling for {{ f1 }} seconds, your champion teleports to target allied structure, minion, or ward. Teleporting to an allied turret puts Teleport on a {{ f4 }} second cooldown instead. You may reactivate Teleport to cancel it, placing it on a {{ f3 }} second cooldown.",
            "key": "SummonerTeleport",
            "costBurn": "0",
            "tooltip": "After channeling for {{ f1 }} seconds, your champion teleports to target allied structure, minion, or ward. Teleporting to an allied turret puts Teleport on a {{ f4 }} second cooldown instead.<br><br>You may reactivate Teleport to cancel it, placing it on a {{ f3 }} second cooldown."
        },
        "SummonerPoroRecall": {
            "range": "self",
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerPoroRecall.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 48,
                "x": 0
            },
            "cost": [0],
            "cooldown": [10],
            "summonerLevel": 1,
            "id": 30,
            "sanitizedDescription": "Quickly travel to the Poro King's side.",
            "rangeBurn": "self",
            "costType": "NoCost",
            "cooldownBurn": "10",
            "description": "Quickly travel to the Poro King's side.",
            "name": "To the King!",
            "modes": ["KINGPORO"],
            "sanitizedTooltip": "Passive: Hitting an enemy champion with a Poro gives your team a Poro Mark. Upon reaching 10 Poro Marks, your team summons the Poro King to fight alongside them. While the Poro King is active, no Poro Marks can be scored by either team. Active: Quickly dash to King Poro's side. Can only be cast while the Poro King is summoned for your team. ''Poros tug the heartstrings. The rest of you just comes along for the ride.''",
            "key": "SummonerPoroRecall",
            "costBurn": "0",
            "tooltip": "<span class=\"colorFFE076\">Passive:<\/span> Hitting an enemy champion with a Poro gives your team a Poro Mark. Upon reaching 10 Poro Marks, your team summons the Poro King to fight alongside them. While the Poro King is active, no Poro Marks can be scored by either team.<br><br><span class=\"colorFFE076\">Active:<\/span> Quickly dash to King Poro's side. Can only be cast while the Poro King is summoned for your team. <br><br><i><span class=\"colorFDD017\">''Poros tug the heartstrings. The rest of you just comes along for the ride.''<\/span><\/i>"
        },
        "SummonerDot": {
            "range": [600],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "effectBurn": [
               "",
               "500",
               "150"
            ],
            "image": {
                "w": 48,
                "full": "SummonerDot.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 144
            },
            "cooldown": [180],
            "cost": [0],
            "summonerLevel": 10,
            "id": 14,
            "vars": [{
                "link": "@player.level",
                "coeff": [
                   70,
                   90,
                   110,
                   130,
                   150,
                   170,
                   190,
                   210,
                   230,
                   250,
                   270,
                   290,
                   310,
                   330,
                   350,
                   370,
                   390,
                   410
                ],
                "key": "f1"
            }],
            "sanitizedDescription": "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
            "rangeBurn": "600",
            "costType": "NoCost",
            "effect": [
               null,
               [500],
               [150]
            ],
            "cooldownBurn": "180",
            "description": "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
            "name": "Ignite",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ARAM",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Ignite deals {{ f1 }} true damage to target enemy champion over 5 seconds, grants you vision of the target and applies Grievous Wounds for the duration. (Grievous Wounds reduces incoming healing effects by 50%. This vision does not reveal stealthed enemies.)",
            "key": "SummonerDot",
            "costBurn": "0",
            "tooltip": "Ignite deals <span class=\"colorFEFCFF\">{{ f1 }}<\/span> true damage to target enemy champion over 5 seconds, grants you vision of the target and applies Grievous Wounds for the duration.<br><br><i>(Grievous Wounds reduces incoming healing effects by 50%. This vision does not reveal stealthed enemies.)<\/i>"
        },
        "SummonerHaste": {
            "range": "self",
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerHaste.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 288
            },
            "cost": [0],
            "cooldown": [210],
            "summonerLevel": 1,
            "id": 6,
            "vars": [{
                "link": "@text",
                "coeff": [27],
                "key": "f1"
            }],
            "sanitizedDescription": "Your champion can move through units and has 27% increased Movement Speed for 10 seconds",
            "rangeBurn": "self",
            "costType": "NoCost",
            "cooldownBurn": "210",
            "description": "Your champion can move through units and has 27% increased Movement Speed for 10 seconds",
            "name": "Ghost",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ARAM",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Your champion can move through units and has {{ f1 }}% increased Movement Speed for 10 seconds.",
            "key": "SummonerHaste",
            "costBurn": "0",
            "tooltip": "Your champion can move through units and has {{ f1 }}% increased Movement Speed for 10 seconds."
        },
        "SummonerSnowball": {
            "range": [1600],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerSnowball.png",
                "sprite": "spell13.png",
                "group": "spell",
                "h": 48,
                "y": 96,
                "x": 384
            },
            "cooldown": [40],
            "cost": [0],
            "summonerLevel": 1,
            "id": 32,
            "sanitizedDescription": "Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked and your champion can quickly travel to the marked target as a follow up.",
            "rangeBurn": "1600",
            "costType": "NoCost",
            "cooldownBurn": "40",
            "description": "Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked and your champion can quickly travel to the marked target as a follow up.",
            "name": "Mark",
            "modes": ["ARAM"],
            "sanitizedTooltip": "Throw a snowball a long distance, dealing {{ f1 }} true damage to the first enemy unit hit. If it hits an enemy, this ability can be recast for {{ f2 }} seconds to Dash to the tagged unit, dealing an additional {{ f5 }} true damage. Dashing to the target will reduce the cooldown of Mark by {{ f3 }}%. Mark projectiles are not stopped by spell shields or projectile mitigation.",
            "key": "SummonerSnowball",
            "costBurn": "0",
            "tooltip": "Throw a snowball a long distance, dealing {{ f1 }} true damage to the first enemy unit hit. If it hits an enemy, this ability can be recast for {{ f2 }} seconds to Dash to the tagged unit, dealing an additional {{ f5 }} true damage. Dashing to the target will reduce the cooldown of Mark by {{ f3 }}%.<br><br><span class=\"colorFFFF00\">Mark projectiles are not stopped by spell shields or projectile mitigation.<\/span>"
        },
        "SummonerHeal": {
            "range": [850],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerHeal.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 336
            },
            "cooldown": [240],
            "cost": [0],
            "summonerLevel": 1,
            "id": 7,
            "vars": [{
                "link": "@player.level",
                "coeff": [
                   90,
                   105,
                   120,
                   135,
                   150,
                   165,
                   180,
                   195,
                   210,
                   225,
                   240,
                   255,
                   270,
                   285,
                   300,
                   315,
                   330,
                   345
                ],
                "key": "f1"
            }],
            "sanitizedDescription": "Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
            "rangeBurn": "850",
            "costType": "NoCost",
            "cooldownBurn": "240",
            "description": "Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
            "name": "Heal",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ARAM",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Restores {{ f1 }} Health and grants 30% Movement Speed for 1 second to your champion and target allied champion. This healing is halved for units recently affected by Summoner Heal. If this spell cannot find a target, it will cast on the most wounded allied champion in range.",
            "key": "SummonerHeal",
            "costBurn": "0",
            "tooltip": "Restores {{ f1 }} Health and grants 30% Movement Speed for 1 second to your champion and target allied champion. This healing is halved for units recently affected by Summoner Heal.<br><br><span class=\"colorFFFF00\">If this spell cannot find a target, it will cast on the most wounded allied champion in range.<\/span>"
        },
        "SummonerSmite": {
            "range": [500],
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerSmite.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 48,
                "x": 96
            },
            "cost": [0],
            "cooldown": [90],
            "summonerLevel": 10,
            "id": 11,
            "vars": [{
                "link": "@player.level",
                "coeff": [
                   390,
                   410,
                   430,
                   450,
                   480,
                   510,
                   540,
                   570,
                   600,
                   640,
                   680,
                   720,
                   760,
                   800,
                   850,
                   900,
                   950,
                   1000
                ],
                "key": "f1"
            }],
            "sanitizedDescription": "Deals 390-1000 true damage (depending on champion level) to target epic or large monster or enemy minion.",
            "rangeBurn": "500",
            "costType": "NoCost",
            "cooldownBurn": "90",
            "description": "Deals 390-1000 true damage (depending on champion level) to target epic or large monster or enemy minion.",
            "name": "Smite",
            "modes": [
               "CLASSIC",
               "TUTORIAL"
            ],
            "sanitizedTooltip": "Deals {{ f1 }} true damage to target epic or large monster or enemy minion. Smite regains a charge every {{ f3 }} seconds, up to a maximum of 2 charges. Smiting Large Monsters instantly harvests additional bonuses based on the Monster. Mouse over large jungle monsters to see potential bonus rewards.",
            "key": "SummonerSmite",
            "costBurn": "0",
            "tooltip": "Deals <span class=\"colorFEFCFF\">{{ f1 }}<\/span> true damage to target epic or large monster or enemy minion.<br><br>Smite regains a charge every {{ f3 }} seconds, up to a maximum of 2 charges.<br><br><i>Smiting Large Monsters instantly harvests additional bonuses based on the Monster. Mouse over large jungle monsters to see potential bonus rewards.<\/i>"
        },
        "SummonerExhaust": {
            "range": [650],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerExhaust.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 192
            },
            "cooldown": [210],
            "cost": [0],
            "summonerLevel": 4,
            "id": 3,
            "sanitizedDescription": "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by 30%, their Armor and Magic Resist by 10, and their damage dealt by 40% for 2.5 seconds.",
            "rangeBurn": "650",
            "costType": "NoCost",
            "cooldownBurn": "210",
            "description": "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by 30%, their Armor and Magic Resist by 10, and their damage dealt by 40% for 2.5 seconds.",
            "name": "Exhaust",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ARAM",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by {{ f3 }}%, their Armor and Magic Resist by {{ f4 }}, and their damage dealt by {{ f2 }}% for 2.5 seconds.",
            "key": "SummonerExhaust",
            "costBurn": "0",
            "tooltip": "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by {{ f3 }}%, their Armor and Magic Resist by {{ f4 }}, and their damage dealt by {{ f2 }}% for 2.5 seconds."
        },
        "SummonerPoroThrow": {
            "range": [2500],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerPoroThrow.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 48,
                "x": 48
            },
            "cooldown": [20],
            "cost": [0],
            "summonerLevel": 1,
            "id": 31,
            "sanitizedDescription": "Throw a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
            "rangeBurn": "2500",
            "costType": "NoCost",
            "cooldownBurn": "20",
            "description": "Throw a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
            "name": "Poro Toss",
            "modes": ["KINGPORO"],
            "sanitizedTooltip": "Active: Throw a Poro a long distance, dealing {{ f1 }} true damage to the first enemy unit hit. This ability can be recast for 3 seconds if it hits an enemy, to dash to the target hit. Dashing to the target will reduce the cooldown of Poro Toss by 5 seconds. Poros are not blocked by spell shields or wind walls because they are animals, not spells! ''Poros are a model for Runeterran aerodynamics.''",
            "key": "SummonerPoroThrow",
            "costBurn": "0",
            "tooltip": "<span class=\"colorFFE076\">Active:<\/span> Throw a Poro a long distance, dealing {{ f1 }} true damage to the first enemy unit hit. This ability can be recast for 3 seconds if it hits an enemy, to dash to the target hit. Dashing to the target will reduce the cooldown of Poro Toss by 5 seconds.<br><br>Poros are not blocked by spell shields or wind walls because they are animals, not spells!<br><br><i><span class=\"colorFDD017\">''Poros are a model for Runeterran aerodynamics.''<\/span><\/i>"
        },
        "SummonerMana": {
            "range": [600],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerMana.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 384
            },
            "cooldown": [180],
            "cost": [0],
            "summonerLevel": 1,
            "id": 13,
            "vars": [{
                "link": "@player.level",
                "coeff": [
                   190,
                   220,
                   250,
                   280,
                   310,
                   340,
                   370,
                   400,
                   430,
                   460,
                   490,
                   520,
                   550,
                   580,
                   610,
                   640,
                   670,
                   700
                ],
                "key": "f1"
            }],
            "sanitizedDescription": "Restores 40% of your champion's maximum Mana. Also restores allies for 40% of their maximum Mana",
            "rangeBurn": "600",
            "costType": "NoCost",
            "cooldownBurn": "180",
            "description": "Restores 40% of your champion's maximum Mana. Also restores allies for 40% of their maximum Mana",
            "name": "Clarity",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ARAM",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Restores {{ f1 }}% maximum Mana to your Champion and nearby allies.",
            "key": "SummonerMana",
            "costBurn": "0",
            "tooltip": "Restores {{ f1 }}% maximum Mana to your Champion and nearby allies."
        },
        "SummonerClairvoyance": {
            "range": [25000],
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerClairvoyance.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 96
            },
            "cost": [0],
            "cooldown": [55],
            "summonerLevel": 8,
            "id": 2,
            "vars": [{
                "link": "@text",
                "coeff": [4],
                "key": "f1"
            }],
            "sanitizedDescription": "Reveals a small area of the map for your team for 5 seconds.",
            "rangeBurn": "25000",
            "costType": "NoCost",
            "cooldownBurn": "55",
            "description": "Reveals a small area of the map for your team for 5 seconds.",
            "name": "Clairvoyance",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Reveals a small area of the map for your team for {{ f1 }} seconds.",
            "key": "SummonerClairvoyance",
            "costBurn": "0",
            "tooltip": "Reveals a small area of the map for your team for {{ f1 }} seconds."
        },
        "SummonerBarrier": {
            "range": "self",
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerBarrier.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 0
            },
            "cost": [0],
            "cooldown": [210],
            "summonerLevel": 4,
            "id": 21,
            "sanitizedDescription": "Shields your champion for 115-455 (depending on champion level) for 2 seconds.",
            "rangeBurn": "self",
            "costType": "NoCost",
            "cooldownBurn": "210",
            "description": "Shields your champion for 115-455 (depending on champion level) for 2 seconds.",
            "name": "Barrier",
            "modes": [
               "ARAM",
               "CLASSIC",
               "TUTORIAL",
               "ODIN",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Temporarily shields {{ f1 }} damage from your champion for 2 seconds.",
            "key": "SummonerBarrier",
            "costBurn": "0",
            "tooltip": "Temporarily shields {{ f1 }} damage from your champion for 2 seconds."
        },
        "SummonerFlash": {
            "range": [425],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerFlash.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 240
            },
            "cooldown": [300],
            "cost": [0],
            "summonerLevel": 8,
            "id": 4,
            "sanitizedDescription": "Teleports your champion a short distance toward your cursor's location.",
            "rangeBurn": "425",
            "costType": "NoCost",
            "cooldownBurn": "300",
            "description": "Teleports your champion a short distance toward your cursor's location.",
            "name": "Flash",
            "modes": [
               "CLASSIC",
               "ODIN",
               "TUTORIAL",
               "ARAM",
               "ASCENSION"
            ],
            "sanitizedTooltip": "Teleports your champion a short distance toward your cursor's location.",
            "key": "SummonerFlash",
            "costBurn": "0",
            "tooltip": "Teleports your champion a short distance toward your cursor's location."
        },
        "SummonerOdinGarrison": {
            "range": [1250],
            "leveltip": {
                "effect": [""],
                "label": [""]
            },
            "resource": "No Cost",
            "maxrank": 1,
            "image": {
                "w": 48,
                "full": "SummonerOdinGarrison.png",
                "sprite": "spell0.png",
                "group": "spell",
                "h": 48,
                "y": 0,
                "x": 432
            },
            "cooldown": [210],
            "cost": [0],
            "summonerLevel": 1,
            "id": 17,
            "sanitizedDescription": "Allied Turret: Grants massive regeneration for 8 seconds. Enemy Turret: Reduces damage dealt by 80% for 8 seconds.",
            "rangeBurn": "1250",
            "costType": "NoCost",
            "cooldownBurn": "210",
            "description": "Allied Turret: Grants massive regeneration for 8 seconds. Enemy Turret: Reduces damage dealt by 80% for 8 seconds.",
            "name": "Garrison",
            "modes": ["ODIN"],
            "sanitizedTooltip": "Allied Turret: Grants massive regeneration for 8 seconds. Enemy Turret: Reduces damage dealt by 80% for 8 seconds.",
            "key": "SummonerOdinGarrison",
            "costBurn": "0",
            "tooltip": "<span class=\"size16 colorFF9900\">Allied Turret:<\/span> Grants massive regeneration for 8 seconds.<br><br><span class=\"size16 colorFF9900\">Enemy Turret:<\/span> Reduces damage dealt by 80% for 8 seconds."
        }
    },
    "type": "summoner",
    "version": "5.16.1"
};