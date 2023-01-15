export default class PussyConf {
    constructor([ID, y,x,Size,Type]){
        this.id = ID
        this.type = Type
        this.y = y
        this.x = x
        this.size = Size
        //this.style = {top: y, right: x, height: Height, width: Width}
    }
    replace(y,x){
        this.y = y
        this.x = x
    }

    // _init_(){

    // }

}

