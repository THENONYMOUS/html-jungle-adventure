/*it could set text based on an object
text: "" main text displayed
buttons: [] array of objects, each inner object:
    text: "" text displayed on button
    destination: "" part of the game object which each object sets it to
    onClick: () optional, function when you press the button*/
const game = {
    endGame: {
        text: "You have reached a current end of this game, well done!",
    },
    deathScene: {
        text: "You have perished... (reload to restart)",
    },
    startScene: {
        text: "You are lost in a jungle, with nothing... Wait, what's that?",
        buttons: [
            {
                text: "Continue", 
                destination: "riverScene"
            }
        ]
    },
    riverScene: {
        text: "You find yourself at a river with a great cliff behind you",
        buttons: [
            {
                text: "Cross the river and gain a knife (20% chance to die)", 
                destination: "riverScene_cross", 
                onClick() {
                    giveItem("🗡️");
                    if (Math.random() <= 0.2) {
                        currentScene = game.deathScene;
                        updateScene();
                    }
                }
            },
            {
                text: "Don't cross the river, but if there's obstacles...", 
                destination: "riverScene_noCross"
            }
        ]
    },
    riverScene_noCross: {
        text: "\"Nah, that's too risky, I'll find somewhere else to cross\"... After a bit of walking you see a bush move... do you proceed?",
        buttons: [
            {
                text: "Proceed, shouldn't be dangerous...",
                destination: "bushProceed",
            },
            {
                text: "I dunno, I'll go back...",
                destination: "riverScene",
                onClick() {
                    game.riverScene.text += "... again"
                },
            },
        ]
    },
    bushProceed: {
        text: "\"AAA THE BUSH MOVED!!!\", wait it was just the wind, nevermind...",
        buttons: [
            {
                text: "Explore",
                destination: "exploreA1",
            },
            {
                text: "Try to find Wood and build a shelter",
                destination: "woodA1",
            },
        ],
    },
    riverScene_cross: {
        text: "Hey, you found a knife, cool! This will let you do other things! What do you want to do though?",
        buttons: [
            {
                text: "Explore",
                destination: "exploreA1",
            },
            {
                text: "Try to find Wood and build a shelter",
                destination: "woodA1",
            },
        ]
    },
    woodA1: {
        text: "You venture into the trees and hope to find some branches lying on the floor, luckily, there's quite a few branches and you are easily able to find enough for a shelter. The problem is, they're all way too heavy to lift so you'll have to go somewhere else...",
        buttons: [
            {
                text: "Try to find more wood...",
                destination: "woodA2",
            },
        ]
    },
    woodA2: {
        text: "The trees here are younger so the branches are much thinner and you're able to lift them, you want to be near water for fishing and easier food so you take some branches and head towards where you think the river is...",
        buttons: [
            {
                text: "Head towards the river",
                destination: "woodA3",
            },
        ]
    },
    woodA3: {
        text: "You start to hear water and soon see it too, a grand waterfall, plummetting into a pool which leads into the river, you decide this is a nice place for your shelter",
        buttons: [
            {
                text: "Begin construction",
                destination: "shelterScene",
            },
        ]
    },
    exploreA1: {
        text: "You wander upstream along the river and the cliff goes closer to the river until there isn't anywhere to walk on the other side, where you were before...",
        buttons: [
            {
                text: "Continue to Explore...",
                destination: "exploreA2",
            },
        ]
    },
    exploreA2: {
        text: "Ahead, you see a grand waterfall, plummetting into a pool which leads into the river, you decide that this would be a nice place for your shelter",
        buttons: [
            {
                text: "Gather some wood and build your shelter",
                destination: "shelterScene",
            },
        ]
    },
    shelterScene: {
        text: "\"It's complete!\" A small pile of wood leaning against a tree lies in front of you, what you call \"a shelter\".",
        buttons: [
            {
                text: "Start Chapter I: Survival",
                destination: "endGame",
                onClick() {
                    document.getElementById("chapter").textContent = "Chapter I: Survival";
                    giveItem("🛖");
                },
            },
        ],
    },
}

items = [];
function giveItem(item) {
    if(!items.includes(item)) items.push(item);

    let inventory = "Inventory:";
    for(item in items) {
        inventory += " "+items[item];
    }
    inventoryText.textContent = inventory;
}

const currentSceneText = document.getElementById("current-scene-text");
const buttons = document.getElementById("buttons");
const inventoryText = document.getElementById("inventory");

let currentScene = game.startScene;


function updateScene() {
    currentSceneText.textContent = currentScene.text;
    if (!("buttons" in currentScene)) return;
    for (const { text, destination, onClick } of currentScene.buttons) {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", () => {
            if (destination !== undefined) {
                currentScene = game[destination];
                onClick?.();
                // for (const child of buttons.children) child.remove();
                while (buttons.firstChild) buttons.removeChild(buttons.lastChild)
                updateScene();
            }
        });
        buttons.appendChild(button);
    };
}

updateScene();
/*
lore ideas go here:
before those you're in "Prologue"
once you get a shelter you are in "Chapter I: Survival"
when you get that boat then you begin "Chapter II: The Seas"
*/