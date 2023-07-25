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
                destination: "endGame",
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
    riverScene_cross: {
        text: "Hey, you found a knife, cool! This will let you do other things! What do you want to do though?",
        buttons: [
            {
                text: "Explore",
                destination: "endGame",
            },
            {
                text: "Try to find Wood and build a shelter",
                destination: "endGame",
            },
        ]
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