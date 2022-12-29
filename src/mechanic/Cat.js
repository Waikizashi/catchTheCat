export default class PussyConf {
    constructor([y,x,Size]){
        
        this.sizeModofier = 50
        this.y = y
        this.x = x
        this.size = Size
        //this.style = {top: y, right: x, height: Height, width: Width}
    }
    resize(modifier){
        this.size = modifier
    }
    replace(y,x){
        this.y = y
        this.x = x
    }

    // _init_(){

    // }

}

