import FSMState from "./FSMState";
import BoardSetting from "./BoardSetting";
import Board from "./Board";
import BoardControl from "./BoardControl";
import MouseMove from "./MouseMove";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewGameState extends FSMState {

    private boardSetting: BoardSetting = null;
    private mouseMove: MouseMove = null;

    boardInstance = Board.Inst;

    OnEnter(){
        super.OnEnter();
        
        if(!this.boardSetting && !this.mouseMove){
            this.boardSetting = new BoardSetting;
            this.mouseMove = new MouseMove;
        }
        
        console.debug('狀態: NewGameState');
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN);

        let boardInstance = Board.Inst;
        boardInstance.setMap(this.boardSetting.initMap());

        boardInstance.setlineType(-1);
        boardInstance.setlineNum(-1);
        boardInstance.setGameTie(false);
        boardInstance.setLine(true);
        boardInstance.setNewGame(true);

        console.debug('遊戲重置完成');
        this.component.getComponent(BoardControl).ChangeState(1);
    }

    OnUpdate(){
        super.OnUpdate();
    }
}
