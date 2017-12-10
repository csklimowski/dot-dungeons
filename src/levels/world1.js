export const world1 = [
    {
        id: '1-A',
        name: 'Where Is Everyone?',
        layout: [
            '          ',
            '   00000   ',
            '   00000   ',
            ' N0001000X ',
            '   00000   ',
            '   00000   ',
            '          ',
        ],
        prereqs: []
    },
    {
        id: '1-B',
        name: 'Oh There They Are',
        layout: [
            '          ',
            '   00000   ',
            '   01110   ',
            ' N0011100X ',
            '   01110   ',
            '   00000   ',
            '          ',
        ],
        prereqs: [
            '1-A'
        ]
    },
    {
        id: '2-A',
        name: 'Closing In',
        layout: [
            '          ',
            '   0000   ',
            ' N001100X ',
            '   0000   ',
            '          ',
        ],
        prereqs: [
            '1-A'
        ]
    },
    {
        id: '2-B',
        name: 'Blockade',
        layout: [
            '          ',
            '   0110   ',
            ' N001100X ',
            '   0110   ',
            '          ',
        ],
        prereqs: [
            '2-A'
        ]
    },
    {
        id: '3-A',
        name: 'Hallway Fight',
        layout: [
            '           ',
            ' N0011100X ',
            '   00000   ',
            '           ',
        ],
        prereqs: [
            '2-A'
        ]
    },
    {
        id: '3-B',
        name: 'They Brought Friends',
        layout: [
            '           ',
            ' N0111110X ',
            '   00000   ',
            '           ',
        ],
        prereqs: [
            '3-A'
        ]
    },
    {
        id: '4-A',
        name: 'Line Them Up',
        layout: [
            '        ',
            '   00   ',
            '   01   ',
            '   01   ',
            '   01   ',
            ' N0010X ',
            '        ',
        ],
        prereqs: [
            '2-A'
        ]
    },
    {
        id: '4-B',
        name: 'Just One More',
        layout: [
            '        ',
            '   01   ',
            '   01   ',
            '   01   ',
            '   01   ',
            ' N0010X ',
            '        ',
        ],
        prereqs: [
            '3-A'
        ]
    },
];