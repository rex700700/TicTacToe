import FSMState from "./FSMState";
import BoardControl from "./BoardControl";
import MouseMove from "./MouseMove";
import BoardSetting from "./BoardSetting";
import Board from "./Board";

const {ccclass, property} = cc._decorator;

@ccclass
export default class XPlayerState extends FSMState {

    private boardSetting: BoardSetting = null;
    private mouseMove: MouseMove = null;

    boardInstance = Board.Inst;

    OnEnter(){
        super.OnEnter();
        console.log("狀態: XPlayerState");

        if(!this.mouseMove && !this.boardSetting){
            this.mouseMove = new MouseMove;
            this.boardSetting = new BoardSetting;
        }

        this.boardInstance.setPlayerName("X");
    }

    OnUpdate(){
        super.OnUpdate();

        if(this.mouseMove && this.boardInstance.getNextOneValue()){
            this.nextOne();
        }
    }

    nextOne(){
        let map = this.boardInstance.getMap();
        let cheak = this.boardSetting.cheakBoard(map);
        
        this.boardInstance.setNextOneValue(false);
        
        if(cheak){
            if(this.boardInstance.getGameTie()){
                console.debug('遊戲結束, 和局');
                this.boardInstance.setVicPlayer('OX');
                this.boardInstance.setEndType('和局');
                this.state(3);
            } else {
                console.debug('遊戲結束, X勝利');
                this.boardInstance.setVicPlayer('X');
                this.boardInstance.setEndType('勝利');
                this.state(3);
            }
        } else {
            console.debug('比賽繼續, O操作');
            this.state(2);
        }
    }

    state(num: number){
        this.component.getComponent(BoardControl).ChangeState(num);
    }
}
