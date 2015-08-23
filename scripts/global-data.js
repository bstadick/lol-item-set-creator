/**
* The list of items possible build tree configurations.
* @global
*/
var buildLayouts = {
    linearOne: {name: "Linear-One", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', '']
    ]},
    linearTwo: {name: "Linear-Two", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', '']
    ]},
    linearThree: {name: "Linear-Three", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', '']
    ]},
    linearFour: {name: "Linear-Four", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'4A', f:'<div class="item-placeholder"></div>'}, '3A', '']
    ]},
    four: {name: "4", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2D', f:'<div class="item-placeholder"></div>'}, '1A', '']
    ]},
    three: {name: "3", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', '']
    ]},
    three_TwoTwoTwo: {name: "3: 2 2 2", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3E', f:'<div class="item-placeholder"></div>'}, '2C', ''],
        [{v:'3F', f:'<div class="item-placeholder"></div>'}, '2C', '']
    ]},
    three_OneZeroZero: {name: "3: 1 0 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', '']
    ]},
    three_ZeroOneZero: {name: "3: 0 1 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    three_ZeroZeroOne: {name: "3: 0 0 1", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2C', '']
    ]},
    three_TwoZeroZero: {name: "3: 2 0 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', '']
    ]},
    three_ZeroTwoZero: {name: "3: 0 2 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    three_OneTwoZero: {name: "3: 1 2 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    three_TwoOneTwo: {name: "3: 2 1 2", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2C', ''],
        [{v:'3E', f:'<div class="item-placeholder"></div>'}, '2C', '']
    ]},
    three_OneThreeZero: {name: "3: 1 3 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2C', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two: {name: "2", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', '']
    ]},
    two_ZeroOne: {name: "2: 0 1", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two_OneZero: {name: "2: 1 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', '']
    ]},
    two_OneOne: {name: "2: 1 1", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two_TwoZero: {name: "2: 2 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', '']
    ]},
    two_TwoZero_Evovled: {name: "2: 2 0 evolved", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'4A', f:'<div class="item-placeholder"></div>'}, '3A', ''],
        [{v:'4B', f:'<div class="item-placeholder"></div>'}, '3A', '']
    ]},
    two_TwoOne: {name: "2: 2 1", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two_OneTwo: {name: "2: 1 2", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two_TwoTwo: {name: "2: 2 2", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two_TwoTwo_ZeroOneZeroZero: {name: "2: 2 2: 0 1 0 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'4A', f:'<div class="item-placeholder"></div>'}, '3B', '']
    ]},
    two_ThreeZero: {name: "2: 3 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2A', '']
    ]},
    two_ThreeOne: {name: "2: 3 1", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two_ThreeTwo: {name: "2: 3 2", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2B', ''],
        [{v:'3E', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]},
    two_TwoZero_OneTwoZero: {name: "2: 2 0: 1 2 0", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'4A', f:'<div class="item-placeholder"></div>'}, '3A', ''],
        [{v:'4B', f:'<div class="item-placeholder"></div>'}, '3B', ''],
        [{v:'4C', f:'<div class="item-placeholder"></div>'}, '3B', '']
    ]},
    two_FourOne: {name: "2: 4 1", tree: [
        [{v:'1A', f:'<div class="item-placeholder"></div>'}, '', ''],
        [{v:'2A', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'2B', f:'<div class="item-placeholder"></div>'}, '1A', ''],
        [{v:'3A', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3B', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3C', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3D', f:'<div class="item-placeholder"></div>'}, '2A', ''],
        [{v:'3E', f:'<div class="item-placeholder"></div>'}, '2B', '']
    ]}
};

/**
* The list of store categories.
* @global
*/
var itemCategories = [
    {
        id: "ALL",
        parentId: "",
        panel: 1,
        displayName: "All Items",
        isPrimary: true,
        items: []
    },
    {
        id: "START",
        parentId: "",
        panel: 2,
        displayName: "Starter Items",
        isPrimary: true,
        items: []
    },
    {
        id: "JUNGLE",
        parentId: "START",
        panel: 3,
        displayName: "Jungling",
        isPrimary: false,
        items: []
    },
    {
        id: "LANE",
        parentId: "START",
        panel: 4,
        displayName: "Laning",
        isPrimary: false,
        items: []
    },
    {
        id: "TOOLS",
        parentId: "",
        panel: 5,
        displayName: "Tools",
        isPrimary: true,
        items: []
    },
    {
        id: "CONSUMABLE",
        parentId: "TOOLS",
        panel: 6,
        displayName: "Consumable",
        isPrimary: false,
        items: []
    },
    {
        id: "GOLDPER",
        parentId: "TOOLS",
        panel: 7,
        displayName: "Gold Income",
        isPrimary: false,
        items: []
    },
    {
        id: "VISION",
        parentId: "TOOLS",
        panel: 8,
        displayName: "Vision & Trinkets",
        isPrimary: false,
        items: []
    },
    {
        id: "DEFENSE",
        parentId: "",
        panel: 9,
        displayName: "Defense",
        isPrimary: true,
        items: []
    },
    {
        id: "ARMOR",
        parentId: "DEFENSE",
        panel: 10,
        displayName: "Armor",
        isPrimary: false,
        items: []
    },
    {
        id: "HEALTH",
        parentId: "DEFENSE",
        panel: 11,
        displayName: "Health",
        isPrimary: false,
        items: []
    },
    {
        id: "HEALTHREGEN",
        parentId: "DEFENSE",
        panel: 12,
        displayName: "Health Regen",
        isPrimary: false,
        items: []
    },
    {
        id: "SPELLBLOCK",
        parentId: "DEFENSE",
        panel: 13,
        displayName: "Magic Resist",
        isPrimary: false,
        items: []
    },
    {
        id: "ATTACK",
        parentId: "",
        panel: 14,
        displayName: "Attack",
        isPrimary: true,
        items: []
    },
    {
        id: "ATTACKSPEED",
        parentId: "ATTACK",
        panel: 15,
        displayName: "Attack Speed",
        isPrimary: false,
        items: []
    },
    {
        id: "CRITICALSTRIKE",
        parentId: "ATTACK",
        panel: 16,
        displayName: "Critical Strike",
        isPrimary: false,
        items: []
    },
    {
        id: "DAMAGE",
        parentId: "ATTACK",
        panel: 17,
        displayName: "Damage",
        isPrimary: false,
        items: []
    },
    {
        id: "LIFESTEAL",
        parentId: "ATTACK",
        panel: 18,
        displayName: "Life Steal",
        isPrimary: false,
        items: []
    },
    {
        id: "MAGIC",
        parentId: "",
        panel: 19,
        displayName: "Magic",
        isPrimary: true,
        items: []
    },
    {
        id: "COOLDOWNREDUCTION",
        parentId: "MAGIC",
        panel: 20,
        displayName: "Cooldown Reduction",
        isPrimary: false,
        items: []
    },
    {
        id: "MANA",
        parentId: "MAGIC",
        panel: 21,
        displayName: "Mana",
        isPrimary: false,
        items: []
    },
    {
        id: "MANAREGEN",
        parentId: "MAGIC",
        panel: 22,
        displayName: "Mana Regen",
        isPrimary: false,
        items: []
    },
    {
        id: "SPELLDAMAGE",
        parentId: "MAGIC",
        panel: 23,
        displayName: "Ability Power",
        isPrimary: false,
        items: []
    },
    {
        id: "MOVEMENT",
        parentId: "",
        panel: 24,
        displayName: "Movement",
        isPrimary: true,
        items: []
    },
    {
        id: "BOOTS",
        parentId: "MOVEMENT",
        panel: 25,
        displayName: "Boots",
        isPrimary: false,
        items: []
    },
    {
        id: "NONBOOTSMOVEMENT",
        parentId: "MOVEMENT",
        panel: 26,
        displayName: "Other Movement Items",
        isPrimary: false,
        items: []
    }
];