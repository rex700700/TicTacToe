export default class Board{

    private static instance: Board = null;
    private map: number[][];

    private constructor(){
        this.map = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }

    public static get Inst(): Board {

        if(!Board.instance){
            Board.instance = new Board();
        }

        return this.instance;
    }

    getMap(): number[][] {
        return this.map;
    }

    setMap(newMap: number[][]): void {
        this.map = newMap;
    }
    
    private targetAreaStart: cc.Vec2[] = [];

    getTargetAreaStart(){
        return this.targetAreaStart;
    }

    pushTargetAreaStart(newPosition: cc.Vec2){
        this.targetAreaStart.push(newPosition);
    }

    resetTargetAreaStart(){
        this.targetAreaStart = [];
    }

    private nextOneValue: boolean = false;
    
    getNextOneValue(): boolean {
        return this.nextOneValue;
    }

    setNextOneValue(bool: boolean) {
        this.nextOneValue = bool;
    }

    private playerName: string = "null";

    getPlayerName(): string {
        return this.playerName;
    }

    setPlayerName(name: string){
        return this.playerName = name;
    }

    private lineType: number = -1;

    getlineType(): number {
        return this.lineType;
    }

    setlineType(num: number){
        this.lineType = num;
    }

    private lineNum: number = -1;

    getlineNum(): number {
        return this.lineNum;
    }

    setlineNum(num: number){
        this.lineNum = num;
    }

    private newGame: boolean = false;

    getNewGame(){
        return this.newGame;
    }

    setNewGame(bool: boolean){
        this.newGame = bool;
    }

    private gameOver: boolean = false;

    getGameOver(): boolean {
        return this.gameOver;
    }

    setGameOver(bool: boolean){
        this.gameOver = bool;
    }

    private line: boolean = true;

    getLine(){
        return this.line;
    }

    setLine(bool: boolean){
        this.line = bool;
    }

    //和局
    private gameTie: boolean = false;

    getGameTie(): boolean {
        return this.gameTie;
    }

    setGameTie(bool: boolean){
        this.gameTie = bool;
    }

    private endType: string = "";

    getEndType(){
        return this.endType;
    }

    setEndType(str: string){
        this.endType = str;
    }

    private vicPlayer: string = "";

    getVicPlayer(){
        return this.vicPlayer;
    }

    setVicPlayer(str: string){
        this.vicPlayer = str;
    }
}