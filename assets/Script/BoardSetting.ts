import Board from "./Board";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BoardSetting extends cc.Component {

    boardInstance = Board.Inst;

    public initMap():number[][] {
        const mapSize = 3;
        const map: number[][] = new Array(mapSize).fill(0).map(() => new Array(mapSize).fill(0));

        return map;
    }

    public cheakBoard(map: number[][]): boolean {
        
        //橫的勝利判定 
        for(let i = 0; i < 3; i++){
            if(map[i][0] != 0 && map[i][0] == map[i][1] && map[i][0] == map[i][2]){
                console.debug("第" + i + "列成立");
                this.boardInstance.setlineType(1);
                this.boardInstance.setlineNum(i);
                this.boardInstance.setGameOver(true);

                return true;
            }
        }

        //直的勝利判定
        for(let i = 0; i < 3; i++){
            if(map[0][i] != 0 && map[0][i] == map[1][i] && map[0][i] == map[2][i]){
                console.log("第" + i + "行成立");
                this.boardInstance.setlineType(2);
                this.boardInstance.setlineNum(i);
                this.boardInstance.setGameOver(true);
                return true;
            }
        }

        //斜的勝利判定
        if(map[0][0] != 0 && map[0][0] == map[1][1] && map[0][0] == map[2][2]){
            console.log("斜線1成立");
            this.boardInstance.setlineType(3);
            this.boardInstance.setlineNum(1);
            this.boardInstance.setGameOver(true);

            return true;
        }
        if(map[0][2] != 0 && map[0][2] == map[1][1] && map[0][2] == map[2][0]){
             console.log("斜線2成立");
             this.boardInstance.setlineType(3);
             this.boardInstance.setlineNum(2);
             this.boardInstance.setGameOver(true);

             return true;
         }


        if(this.tie(map)){
            return true;
        }

        return false;
    }

    tie(map: number[][]){
        let tie: boolean = true; // 假設是和局

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 0) {
                    tie = false;
                    break;
                }
            }
            if (!tie) {
                break;
            }
        }

        if (tie) {
            this.boardInstance.setGameTie(true);
            this.boardInstance.setGameOver(true);

            return true;
        }
    }
}
