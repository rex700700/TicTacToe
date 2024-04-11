import FSMState from "./FSMState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FSMManager {

    StateList: FSMState[] = [];
    CurrentIndex: number = -1;

    ChangeState(StateID: number){
        
        this.CurrentIndex = StateID;
        this.StateList[this.CurrentIndex].OnEnter();

    }

    OnUpdate(){
        if(this.CurrentIndex != -1){
            this.StateList[this.CurrentIndex].OnUpdate();
        }
    }
}
