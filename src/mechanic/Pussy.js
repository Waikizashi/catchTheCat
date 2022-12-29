export default class PussyConf {
    constructor([y,x,Height,Width]){
        
        this.sizeModofier = 50
        this.y = y
        this.x = x
        this.height = Height
        this.width = Width
        //this.style = {top: y, right: x, height: Height, width: Width}
    }
    resize(modifier){
        this.height = modifier
        this.width = modifier
    }
    replace(x,y){
        this.y = y
        this.x = x
    }

    // _init_(){

    // }

}

