class Player {
    constructor(name, runes) {
        this.name = name;
        this.runes = runes;
    }

    describe() {
        return ` ${this.name} has ${this.runes} runes }` 
    }
}

class Clan {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add a Player. Argument is not a player: ${player}`);
        }
    }

    describe() {
        return `${this.name} has ${this.players.length} players. `;
    }
}

class Menu {
    constructor() {
        this.clan = [];
        this.selectedClan = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
       
        while (selection != 0) {
            switch (selection) {
                case '1': 
                     this.createClan();
                     break;
                case '2':
                    this.viewClan();
                    break;
                case '3':
                    this.deleteClan();
                    break;
                case '4':
                    this.displayClan();
                    break;
                default:
                    selection =0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Clan
        2) View a Clan
        3) Delete a Clan
        4) Show All Clans
        `);
    }

    showTeamMenuOptions(claninfo) {
        return prompt(`
        0) back
        1) create player 
        2) delete player
        ${claninfo}
        `);
    }

    displayTeams() {
        let clanString = '';
        for (let i = 0; i < this.clan.length; i++) {
            clanString += i + ') ' + this.clan[i].name + '\n';
        }
        alert(clanString);
    }

    createClan() {
        let name = prompt('Please Enter New Clan Name:');
        this.clan.push(new Clan(name));
    }

    viewClan() {
        let index = prompt('Enter the Number of Which Clan You Would Like to View:');
        if (index > -1 && index < this.clan.length) {
            this.selectedClan = this.clan[index];
            let description = 'Clan Name ' + this.selectedClan.name + '\n';
            for (let i = 0; i < this.selectedClan.players.length; i++) {
                description += i + ') ' + this.selectedClan.players[i].name + ' - ' + this.selectedClan.players[i].runes + '\n';
            } 
            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }

    createPlayer() {
        let name = prompt('Enter Desired Player Name:');
        let runes = prompt('Enter Amount of Runes Held: ');
        this.selectedClan.players.push(new Player(name, runes));
    }

    deletePlayer() {
        let index = prompt('Enter player you wish to delete:');
        if (index > -1 && index < this.selectedClan.players.length) {
            this.selectedClan.players.splice(index, 1);
        }
    }
}

let menu = new Menu ();
menu.start();