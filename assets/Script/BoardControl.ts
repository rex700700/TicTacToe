import FSMManager from "./FSMManager";
import NewGameState from "./NewGameState"
import OPlayerState from "./OPlayerState"
import XPlayerState from "./XPlayerState"
import EndState from "./EndState"

const {ccclass, property} = cc._decorator;

enum BoradState {
    NewGame,
    XPlayer,
    OPlayer,
    End
}

@ccclass
export default class BoardControl extends cc.Component {

    fsmManager: FSMManager;

    start() {

        this.fsmManager = new FSMManager();

        let newGame = new NewGameState(BoradState.NewGame, this, this.fsmManager);
        let oPlayer = new OPlayerState(BoradState.OPlayer, this, this.fsmManager);
        let xPlayer = new XPlayerState(BoradState.XPlayer, this, this.fsmManager);
        let end = new EndState(BoradState.End, this, this.fsmManager);
        this.fsmManager.StateList = [newGame,xPlayer,oPlayer,end];
        
        this.fsmManager.ChangeState(BoradState.NewGame);
    }

    update(dt){
        if (this.fsmManager.CurrentIndex != -1) {
            this.fsmManager.OnUpdate();
        }
    }

    public ChangeState(num: number): void {
        this.fsmManager.ChangeState(num);
    }
}
