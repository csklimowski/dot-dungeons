export const world1 = [
    {
        id: '1-1a',
        name: 'Where Is Everyone?',
        layout: [
            '--00000--',
            '--00000--',
            'N0001000X',
            '--00000--',
            '--00000--'
        ],
        prereqs: []
    },
    {
        id: '1-1b',
        name: 'Oh There They Are',
        layout: [
            '--00000--',
            '--01110--',
            'N0011100X',
            '--01110--',
            '--00000--'
        ],
        prereqs: [
            '1-1a'
        ]
    }
];