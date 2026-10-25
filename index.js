

const gameboard = (() =>{
    let board = ["","","","","","","","",""];

    const updateboard = () => [...board];

    //zjisteni kdo jde dal
    const updatemove = (index,player) => {
        if (board[index] === "" && index >= 0 && index < board.length){
            board[index] = player;
            return true;
        }
        return false;
    } 

    const resetboard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    }

    return {updateboard,updatemove,resetboard}
})(); //okamzite spusteni 

const player = ((name,marker) => {

    return {name,marker}
})

const player1 = player("Anton", "X");
const player2 = player("Honza", "O");

const GameController = (() => {
    let activeplayer = player1;

    const playround = ((index) => {
        if(gameboard.updatemove(index,activeplayer.marker)){
            const winner = checkWinner();
            if (winner){
                console.log(`${winner} wins the game!!`)
            }
        }else{
            console.log("something went wrong")
        }
        switchplayer()
        
    })
    const checkWinner = (() => {
         const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]            
        ];

        const board = gameboard.updateboard();
        for (const [a,b,c] of winningCombinations){
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]){
                return board[a]
            }
        }
        return null;
    })
    
    const switchplayer = () => {
        if (activeplayer === player1){
            activeplayer = player2
        }else{
            activeplayer = player1
        }
    }
    return {playround,checkWinner}
})();

GameController.playround(0); 
GameController.playround(1); 
GameController.playround(6);
GameController.playround(4);
GameController.playround(2); 
GameController.playround(7);