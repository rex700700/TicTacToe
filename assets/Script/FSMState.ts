import FSMManager from "./FSMManager";

const {ccclass, property} = cc._decorator;

export default class FSMState{

    StateID: number;
    component: cc.Component;
    fsmManager: FSMManager;

    constructor(stateID: number, component: cc.Component, fsmManager: FSMManager){
        this.StateID = stateID;
        this.component = component;
        this.fsmManager = fsmManager;
    }

    OnEnter(){

    }

    OnUpdate(){
        
    }
}
