import Board from "./Board";
import BoardControl from "./BoardControl";
import FSMState from "./FSMState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EndState extends FSMState {

    boardInstance = Board.Inst;

    OnEnter(){
        super.OnEnter();
        
        console.log("狀態: EndState");

        setTimeout(() => {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }, 1000);

        this.boardInstance.resetTargetAreaStart();
        console.log();
        
    }

    OnUpdate(){
        super.OnUpdate();

    }
    

    onKeyDown(event: cc.Event.EventKeyboard) {
        if (event.keyCode === cc.macro.KEY.r) {
            this.component.getComponent(BoardControl).ChangeState(0);
        }
    }
}       
