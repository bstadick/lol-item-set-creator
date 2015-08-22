/**
* The list of items available in the item store repeater.
* @global
*/
var itemList = [
    {
        id: -1,
        image: "img/w3schools.png",
        isSectionDivider: true,
        cssClass: "store-section-title"
    },
    {
        id: 1,
        image: "img/placeholder1.png",
        isSectionDivider: false,
        cssClass: "draggable-item item-image"
    },
    {
        id: 2,
        image: "img/placeholder2.png",
        isSectionDivider: false,
        cssClass: "draggable-item item-image"
    },
    {
        id: -1,
        image: "img/section_divider.png",
        isSectionDivider: true,
        cssClass: "section-spacer"
    },
    {
        id: -1,
        image: "img/w3schools.png",
        isSectionDivider: true,
        cssClass: "store-section-title"
    },
    {
        id: 3,
        image: "img/placeholder3.png",
        isSectionDivider: false,
        cssClass: "draggable-item item-image"
    },
    {
        id: 4,
        image: "img/placeholder4.png",
        isSectionDivider: false,
        cssClass: "draggable-item item-image"
    }
];

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