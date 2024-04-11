import Board from "./Board";
import EndBase from "./EndBase";
import LineAni from "./LineAni";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MouseMove extends cc.Component {

    @property(EndBase)
    endbase: EndBase = null;

    @property(LineAni)
    lin: LineAni = null;

    @property(cc.SpriteFrame)
    pic: cc.SpriteFrame[] = [];

    @property(cc.Node)
    bg: cc.Node = null;

    private imageNodes: cc.Node[] = [];

    nameNum: number = null;
    setNameNum(): number {
        if(this.boardInstance.getPlayerName() === "X"){
            return 1;
        } else if (this.boardInstance.getPlayerName() === "O"){
            return 2;
        } else {
            return 0;
        }
    }

    targetAreaSize: cc.Size = cc.size(180, 180);
    boardInstance = Board.Inst;
    map = null;

    protected onLoad(): void {
        this.setTarget();
    }

    protected start(): void {
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.handleMouseMove, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.handleMouseDonw, this);
    }

    protected update(dt: number): void {
        if(!this.boardInstance.getNewGame()){
            if(this.boardInstance.getGameOver()){
                if(this.boardInstance.getGameTie()){
                    this.endbase.endBaseWord();
                    this.endbase.openEndBase(true);
                    this.endbase.scaleNodeWithAnimation();

                    setTimeout(() => {
                        return;
                    }, 1000);
                }
                this.boardInstance.resetTargetAreaStart();
                this.lin.lineType();
                this.endbase.endBaseWord();
                this.endbase.openEndBase(true);
                this.endbase.scaleNodeWithAnimation();
                this.boardInstance.setGameOver(false);
            }
        } else {
            this.clearImages();
            this.lin.lineClear();
            this.endbase.openEndBase(false);
            this.setTarget();
            this.boardInstance.setNewGame(false);
        }
    }

    cheakName(name: string): number {
        if(name === "O"){
            return 2;
        } else if (name === "X") {
            return 1;
        }
    }

    setTarget(): void {

        this.boardInstance.resetTargetAreaStart();
        this.map = this.boardInstance.getMap();

        let startNode: cc.Vec2 = new cc.Vec2(188, 430);

        for(let x = 0; x < 3; x++){
            for(let y = 0; y < 3; y++){
                if(this.map[y][x] == 0){
                    let newPosition: cc.Vec2 = new cc.Vec2(startNode.x + (200 * x), startNode.y - (200 * y));
                    this.boardInstance.pushTargetAreaStart(newPosition);
                }
            }
        }
        
    }

    isMouseInTargetArea(mousePos: cc.Vec2): boolean {

        let tar = this.boardInstance.getTargetAreaStart();

        for(let i = 0; i < tar.length; i++){    
            const targetRect = new cc.Rect(tar[i].x, tar[i].y, this.targetAreaSize.width, this.targetAreaSize.height);

            if(targetRect.contains(mousePos)){
                return true;
            }
        }
        return false;
    }

    handleMouseMove(event: cc.Event.EventMouse){
        if(this.boardInstance.getGameOver() === true) {
            if(cc.game.canvas.style.cursor != "default"){
                cc.game.canvas.style.cursor = "default";
            }
            return;
        }

        const mousePos = event.getLocation();
        
        if(this.isMouseInTargetArea(mousePos)){
            cc.game.canvas.style.cursor = "pointer";
        } else {
            cc.game.canvas.style.cursor = "default";
        }
        
    }

    handleMouseDonw(event: cc.Event.EventMouse){
        if(this.boardInstance.getGameOver()) {
            return;
        }

        const mousePos = event.getLocation();
        this.nameNum = this.setNameNum();
        let x = Math.floor((mousePos.x - 210) / 200);
        let y = -Math.floor((mousePos.y - 430) / 200);
        let pos: cc.Vec2 = cc.v2(-200 + x*200,  200 - y*200); 
        
        if(this.isMouseInTargetArea(mousePos)){
            if(this.map[y][x] == 0 ){
                    this.map[y][x] = this.nameNum;
                    this.setTarget();

                    this.boardInstance.setMap(this.map);
                    
                    this.image(this.pic, pos);

                    this.boardInstance.setNextOneValue(true);

                    console.debug(this.boardInstance.getMap());
            } else {
                return;
            }
        }
    }

    image(pic:cc.SpriteFrame[] ,pos: cc.Vec2){
        this.nameNum = this.setNameNum();

        const newNode = new cc.Node();
        newNode.addComponent(cc.Sprite);

        const sprite = newNode.getComponent(cc.Sprite);
        sprite.spriteFrame = pic[this.nameNum - 1];

        newNode.parent = this.bg;

        newNode.setPosition(pos);

        this.imageNodes.push(newNode);
    }

    clearImages() {
        for (const node of this.imageNodes) {
            node.destroy();
        }

        this.imageNodes = [];
    }
}
