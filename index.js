

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
            switchplayer()
        }else{
            console.log("something went wrong")
        }
        
    })
    
    const switchplayer = (() => {
        if (activeplayer === player1){
            activeplayer = player2
        }else{
            activeplayer = player1
        }
    })
    

    return {playround}
})();
