import Board from "./Board";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LineAni extends cc.Component {

    @property(cc.Graphics)
    graphics: cc.Graphics = null;

    boardInstance = Board.Inst;

    lineClear(){
        this.graphics.clear();
    }

    lineType(){
        if(this.boardInstance.getlineType() == 1){
            let y = 200 - 200 * this.boardInstance.getlineNum();
            this.setLinePos(-300, y, 300, y);
        } else if (this.boardInstance.getlineType() == 2){
            let x = -200 + 200 * this.boardInstance.getlineNum();
            this.setLinePos(x, 300, x, -300);
        } else if (this.boardInstance.getlineType() == 3){
            if(this.boardInstance.getlineNum() == 1){
                this.setLinePos(-300, 300, 300, -300);
            }

            if(this.boardInstance.getlineNum() == 2){
                this.setLinePos(300, 300, -300, -300); 
            }
        }

    }

    setLinePos(startPointX: number, startPointY: number, endPointX: number, endPointY: number){
        let startPoint = cc.v2(startPointX, startPointY);
        let endPoint = cc.v2(endPointX, endPointY);

        this.drawing(startPoint, endPoint);
    }

    drawing(startPoint: cc.Vec2, endPoint: cc.Vec2){
        this.graphics.strokeColor = cc.Color.GRAY;
        this.graphics.lineWidth = 20;

        this.graphics.clear();
        this.drawStep(startPoint, endPoint, 0);
    }

    drawStep(startPoint: cc.Vec2, endPoint: cc.Vec2, progress: number) {
        if (progress >= 1) {
            return;
        }

        const currentX = startPoint.x + (endPoint.x - startPoint.x) * progress;
        const currentY = startPoint.y + (endPoint.y - startPoint.y) * progress;

        this.graphics.clear();
        this.graphics.moveTo(startPoint.x, startPoint.y);
        this.graphics.lineTo(currentX, currentY);
        this.graphics.stroke();

        setTimeout(() => {
            this.drawStep(startPoint, endPoint, progress + 0.01);
        }, 10);

    }

}
