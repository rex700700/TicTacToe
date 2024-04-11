import Board from "./Board";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EndBase extends cc.Component {

    boardInstance = Board.Inst;

    @property(cc.Node)
    endbase: cc.Node = null;

    @property(cc.Label)
    winner: cc.Label = null;

    @property(cc.Label)
    endtype: cc.Label = null;

    maxScale: number = 1;
    duration: number = 1;

    scaleNodeWithAnimation(): void {
        this.endbase.scale = 0.4;
        const scaleUpAction = cc.scaleTo(this.duration, this.maxScale);
    
        this.endbase.runAction(scaleUpAction);
    }

    endBaseWord(){
        this.winner.string = this.boardInstance.getVicPlayer();
        this.endtype.string = this.boardInstance.getEndType();
    }
    
    openEndBase(bool: boolean){
        this.endbase.active = bool;
    }
}
