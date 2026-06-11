interface Upgrade {
    name: string;
    description: string;
    cost: number;
    multiplier: number;
    button: string;
}



const upgrades: Upgrade[] = [
    {
        name: "Double Stuffed",
        description: "2x per click",
        cost: 10,
        multiplier: 2,
        button: "10 Samosas"
    },
    {
        name: "Party Pack",
        description: "5x per click",
        cost: 100,
        multiplier: 5,
        button: "100 Samosas"
    },
    {
        name: "Full Feast",
        description: "10x per click",
        cost: 1000,
        multiplier: 10,
        button: "1000 Samosas"
    }
];

export default upgrades;