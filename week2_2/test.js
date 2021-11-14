const data1 = {
type: "root",
child: [
    {
    type: "array",
    child: [
        {
        type: "number",
        value: "1",
        child: [],
        },
        {
        type: "array",
        child: [
            {
            type: "number",
            value: "2",
            child: [],
            },
            {
            type: "array",
            child: [
                {
                type: "number",
                value: "3",
                child: [],
                },
            ],
            },
        ],
        },
    ],
    },
],
};
// [1, 2, [3]]
const stack = {
    type: "root",
    child: [
        {
        type: "array",
        value: "[",
        child: [
            {
                type: "number",
                value: "1",
                child: []
            },
            {
                type: "number",
                value: "2",
                child: []
            },
            {
                type: "array",
                value: "[",
                child: [
                    {
                        type: "number",
                        value: "3",
                        child: []
                    }
                ]
            }
        ]
        }
    ]
    };

data2.child.push({name: 'dd'});
console.log(data2.child);

