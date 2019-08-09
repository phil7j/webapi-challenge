const people = [
    {id: 1,
    name: "Bill",
    chores: [
        {
            id: 1,
            description: "Take out the trash",
            notes: "The kitchen trash is especially full",
            assignedTo: 1,
            completed: false
        },
        {
            id: 2,
            description: "Sweep the kitchen",
            notes: "It's a mess",
            assignedTo: 1,
            completed: false
        },
        {
            id: 3,
            description: "Vacuum the House",
            notes: "Don't forgot the bedroom",
            assignedTo: 1,
            completed: true
        }
    ]},
    {id: 2,
    name: "Jill",
    chores: [
        {
            id: 1,
            description: "Mow the lawn",
            notes: "The backyard and the front yard",
            assignedTo: 2,
            completed: false
        }
    ]
    }
]

module.exports = people;