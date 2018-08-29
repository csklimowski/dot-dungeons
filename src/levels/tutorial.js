export const tutorial = [
    {
        layout: [
            '           ',
            '    0a00b  ',
            '  n0000    ',
            '    0000X  ',
            '           ',
            '           '
        ],
        info: {
            n: "CLICK to move!",
            a: "You may never retrace your own path, but you can\nrevisit dots you've been to before.",
            b: "If you ever get stuck, you can press UNDO to go\nback one step."
        }
    },
    {
        layout: [
            '           ',
            '   b000000 ',
            '   0   000 ',
            ' N0a00 000 ',
            '   0 0 000 ',
            '   000  X  ',
            '           '
        ],
        info: {
            a: "Revisiting dots that you've been to before builds\nup CHARGE.",
            b: "However, if you visit a dot for the first time,\nyour charge goes away."
        }
    },
    {
        layout: [
            '           ',
            ' Na0b0     ',
            '   00000   ',
            '   00010X  ',
            '   00000   ',
            '           ',
        ],
        info: {
            a: "NUMBERS are perfectly harmless, but you need to\nerase them to progress.",
            b: "To erase a number, you need to build up a charge\nequal to it, then touch it."
        }
    }
];