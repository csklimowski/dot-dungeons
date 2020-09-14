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
            a: "You can't retrace your own path, but you can\nrevisit dots you've been to before.",
            b: "If you ever get stuck, you can press           to go\nback one step."
        }
    },
    {
        layout: [
            '           ',
            '   000  X  ',
            '   0 0 000 ',
            ' N000a 000 ',
            '   0   000 ',
            '   b0000c0 ',
            '           '
        ],
        info: {
            a: "Revisiting dots that you've been to before builds\nup CHARGE.",
            b: "But if you visit a dot for the first time, your\ncharge goes away.",
            c: "So, to build up a charge of more than 1, you need\nto revisit multiple dots in a row."
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
            a: "In each room, you need to CAPTURE all of the\nnumbers, then get to the exit.",
            b: "To capture a number, first build up a charge\nequal to it, then touch it."
        }
    }
];