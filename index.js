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
                const winnerhtml = document.getElementById("winner")
                winnerhtml.textContent = `The winner is: ${winner}`
                console.log(`${winner} wins the game!!`)
                gameboard.updateboard()
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
    const divclicked = ((num) => {
        playround(num)
        DisplayController()
    }); 

    const DisplayController = (() => {
        let board = gameboard.updateboard()
        let checkwinner = GameController.checkWinner

        for(let i = 0; i < board.length; i++){
            if (board[i] !== ""){
                const div = document.getElementById(`${i}`)
                div.innerHTML = `${board[i]}`
            }
        }

    });
    
    
    const switchplayer = () => {
        if (activeplayer === player1){
            const activplr = document.getElementById("nexttomove")
            activplr.textContent = `is next to move: ${activeplayer.marker}`
            activeplayer = player2;
        }else{
            const activplr = document.getElementById("nexttomove")
            activplr.textContent = `Is next to move ${activeplayer.marker}`
            activeplayer = player1;
        }
    }
    return {playround,checkWinner,divclicked,DisplayController}
})();