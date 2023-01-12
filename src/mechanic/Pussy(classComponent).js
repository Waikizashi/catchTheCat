import React from "react";
import cn from  'classnames';
//import PussyConf from "../../mechanic/Pussy";
//import getRandomInt from "../../mechanic/getRandomInt";

import cat from "../../img/CatWithOutline.png"
//import badCat from "../../img/REDCatWithOutline.png"
import s from './Pussy.module.css'

export default class Cat extends React.Component {
    constructor(props, config,render){
        super(props)
        this.config = config
        this.render = render
    }
  state = {
    counter: 0,
  };
//   props = {
//     config:{
//         x: 0,
//         y: 0,

//     }
//   }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div style={{
         top: this.config.y,
         right: this.config.x
        }} /*onClick={scoreUp}*/ className={cn(s.cat,{[s.render]: this.render})}>
           <img style={{width: this.config.size}}
             className={s.img} src={cat} alt={'cat'}></img>
        </div>)
  }
}