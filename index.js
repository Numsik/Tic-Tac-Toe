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
    let gameover = false;

    const switchplayer = () => {
        if (!gameover){
            if (activeplayer === player1){
                activeplayer = player2;
                const activplr = document.getElementById("nexttomove")
                activplr.textContent = `is next to move: ${activeplayer.marker}`
            }else{
                activeplayer = player1;
                const activplr = document.getElementById("nexttomove")
                activplr.textContent = `Is next to move ${activeplayer.marker}`
                
            }
        }

    }
    const restartGame = () => {
        gameboard.resetboard()
        
        for(let i = 0; i < 9;i++){
            const div = document.getElementById(`${i}`);
            div.innerHTML = "";
        }
        nexttomove.innerHTML = "";
        winner.innerHTML = "";
        gameover = false;
        document.getElementById("draw").style.display = "none";

    };

    const playround = ((index) => {
        if (gameover){
            return;
        }
        if(gameboard.updatemove(index,activeplayer.marker)){
            const winner = checkWinner();
            if (winner){
                const winnerhtml = document.getElementById("winner")
                winnerhtml.textContent = `The winner is: ${winner}`
                console.log(`${winner} wins the game!!`)
                gameboard.updateboard()
                gameover = true;
            }else if(draw()){
                document.getElementById("draw").style.display = "block";
                gameover = true;
            }
            draw();
        }else{
            console.log("something went wrong")
            return;
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
    const draw = (() => {
        const board = gameboard.updateboard();
        return board.every(b => b !== "") //return musi byt vzdycky posledni 
    });

    const DisplayController = (() => {
        let board = gameboard.updateboard()

        for(let i = 0; i < board.length; i++){
            if (board[i] !== ""){
                const div = document.getElementById(`${i}`)
                div.innerHTML = `${board[i]}`

            }
        }

    });
    
    
    return {playround,checkWinner,divclicked,DisplayController,restartGame}
})();