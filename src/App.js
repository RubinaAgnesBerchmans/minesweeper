import React, {Component } from 'react';
import './App.css';
import Bomb from './dynamite.png';
import Flag from './flag.png';
import Dynamite from './dynamitee.png';
import Timer from './hourglass.png';
import Happy from './happy.png';
import Win from './in-love.png';
import Sad from './sad.png';
import Think from './thinking.png';
import Try from './try.png';
import Home from './mansion.png';

class App extends Component {
    state = {
        matrix : [],
        minimumTime : 0,
        isBombPlaced: false,
        level: 0,
        emojiState:0,

    }
    initializeMatrixHandler = (num) => {
        document.getElementById('game-wrapper').style.display = 'block';
        document.getElementById('table').style.pointerEvents = 'unset';
        document.getElementById('wrapper').style.display = 'none';
        let obj = { value : "" , actValue : "", i: 0, j: 0},i,j;
        let arr = Array(num).fill().map(() => Array(num).fill({...obj}));
        var matrix= arr.map( data => {
            return data.map( val => {
                return val = {...obj};
            })
            
        })
        for (i=0;i<num;i++) {
            for(j=0;j<num;j++) {
                matrix[i][j].i= i;
                matrix[i][j].j= j;
            }            
        }
        this.setState({matrix:matrix,level:num});
    }

    doComputation = (matrix,obj,event) => {
        event.preventDefault();
        if(!this.state.isBombPlaced) {
            this.bombGenerateHandler(matrix,obj,event);
        } else {
            this.showValue(matrix,obj,true,this.state.isBombPlaced,event);
        }
    }

    bombGenerateHandler = (matrix,obj,event) => {
        let randomNoArr = [],randomNum,i,j;
        while (randomNoArr.length < 3 ) {
            randomNum = Math.floor(Math.random() * 10);
            if(!randomNoArr.includes(randomNum) && randomNum !== obj.i && randomNum !== obj.j && randomNum < this.state.level) {
                randomNoArr.push(randomNum);
            }
        } 
        for(i=0;i<3;i++) {
            for(j=i+1;j<3;j++) {
                matrix[randomNoArr[i]][randomNoArr[j]].value = '*';
                matrix[randomNoArr[j]][randomNoArr[i]].value = '*';

            }
        }
       
        this.fillNumbersHandler(matrix,obj,event);      
    }

    fillNumbersHandler = (arr,obj,event) => {
        var rowLimit = arr.length-1,i,j;
        var columnLimit = arr[0].length-1;
        for(i=0;i<arr.length;i++) {
            for(j=0;j<arr.length;j++) {
                for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
                    for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
                        if((x !== i || y !== j) && arr[x][y].value === '*' && arr[i][j].value !== '*') {
                            if(arr[i][j].value === '') {
                                arr[i][j].value = 1;
                            } else 
                            arr[i][j].value++;

                        }
    

                    }
                }
            }
        }
        this.showValue(arr,obj,true,true,event);
    }
   showValue = (matrix,s,isDirectElement,isBombPlaced,event) => {
    console.log(matrix);
 

    let i = s.i,j=s.j,arr=matrix,rowLimit = matrix.length-1,columnLimit = matrix.length-1; 
    if(arr[i][j].value === '*' && isDirectElement) {
        matrix.map( val => {
            return ( val.map( s => {
                    if (s.value === '*') {
                        s.actValue = '*';
                    }
                    return s;           
            }));
        });
        document.getElementById('table').style.pointerEvents = 'none';
        this.setState({matrix:arr,isBombPlaced:isBombPlaced,emojiState:3});
        return;
    }  
    if(arr[i][j].value !== "" && isDirectElement && arr[i][j].value !=='s') {
        arr[i][j].actValue = arr[i][j].value;
        this.checkGameOver(matrix);
        this.setState({matrix:arr,isBombPlaced:isBombPlaced});
        return;
    }
    for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
        for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
            if(Number.isInteger(arr[x][y].value) && arr[x][y].actValue !== 'f') {
                arr[x][y].actValue = arr[x][y].value;
            } else {
                if(arr[x][y].value !== 's' && arr[x][y].value !== '*' && arr[x][y].actValue !== 'f') {
                    arr[x][y].value = 's';
                    this.showValue(arr,arr[x][y],false,isBombPlaced,event);
                }
            }
        }
    }
    console.log(arr);
        this.checkGameOver(matrix,event);
     this.setState({matrix:arr,isBombPlaced:isBombPlaced});
   }
   setFlag = (matrix,obj,event) => {
    if (event.button === 0 && matrix[obj.i][obj.j].actValue !== 'f') {
        matrix[obj.i][obj.j].actValue = 'f'
    } else {
        if(event.button === 0 && matrix[obj.i][obj.j].actValue === 'f') {
            matrix[obj.i][obj.j].actValue = '';   
        }
    }
    this.checkGameOver(matrix,event);
    this.setState({matrix:matrix});
   }
   checkGameOver = (matrix) => {
       var count = 0; 
    matrix.map( val => {
        return ( val.map( s => {
            if(s.value === 's' && s.actValue === '') {
                count++;
            }  if(s.value === '*' && s.actValue === 'f') {
                count++;
            } if(s.value === s.actValue && s.actValue !== '')  {
                count++;
            }
            return count;
            
        }));
    });
    if(count === Math.pow(matrix.length,2)) {
        document.getElementById('table').style.pointerEvents = 'none';
        this.setState({emojiState:4});
        return;

    }
    // this.addClassName(event);
   }
   setHoverEmoji = () => {
       if(this.state.emojiState <= 2)
       this.setState({emojiState:1});
   }
   unsetHoverEmoji = () => {
       if(this.state.emojiState <= 2)
    this.setState({emojiState:0});
   }
    resetGame = () => {
        this.setState({matrix:[],isBombPlaced:false,emojiState:0});
        this.initializeMatrixHandler(this.state.level);
   }
   goHome = () => {
    document.getElementById('wrapper').style.display = 'block';
    this.setState({matrix:[],isBombPlaced:false,emojiState:0,level:0});
    document.getElementById('game-wrapper').style.display = 'none';
}
//    addClassName = (event) => {
//     if(obj.actValue === '' && obj.value === 's' ) {
//         event.target.className = "visited";
//     } else if( obj.actValue === obj.value && obj.value) {
//         event.target.className = "visited";
//     }
//    {obj.actValue}</div> : (obj.actValue === '' && obj.value === '' ?
//     <div className="empty default ">{obj.actValue}</div> : ( obj.actValue === obj.value ?
//         <div className="value ">{obj.actValue}</div> : <div className="bomb ">{obj.actValue}</div>   
//     ))}
//    }
    render() {
       let matrix = [...this.state.matrix];   
        return(
            <React.Fragment>
            <div className = "gameName">MINESWEEPER</div>
            <div className = "wrapper" id="wrapper">
                <button className="button" onClick={() => this.initializeMatrixHandler(8)}>Easy</button><br/>
                <button className="button" onClick={() => this.initializeMatrixHandler(9)}>Medium</button><br/>
                <button className="button" onClick={() => this.initializeMatrixHandler(10)}>Hard</button>
            </div>
            <div id="game-wrapper">
                <div className="upper-deck">
                <img className="icon" src={Dynamite}/><div className="iconName">6</div>
                <img className="emoji" src=
                    {this.state.emojiState === 0 ? Happy : 
                    this.state.emojiState === 1 ? Think :
                    this.state.emojiState === 3 ? Sad : Win }
                />

                </div>
                <table id="table" className="table" onMouseOver={() => this.setHoverEmoji()} onMouseOut = { () => this.unsetHoverEmoji()} >
                    <tbody>
                        { matrix.map( data => {
                            return (
                                <tr className="tr">
                                    { data.map(obj => {
                                        return (
                                            <td className = {
                                                (obj.actValue === '' && obj.value === 's') ? "visited" : (
                                                (obj.value === '*' && obj.actValue === '*' ? "bomb" :   
                                                (obj.actValue === obj.value && obj.value !== '' ) ? "value":(
                                                (obj.actValue === 'f' ) ? "flag" :    
                                                "default"   
                                                ))) 
                                            }
                                            onClick = { (event) => this.setFlag(matrix,obj,event)} onContextMenu = { (event) => this.doComputation(matrix,obj,event)} >
                                                { obj.value === '*' && obj.actValue === '*' ? <img className="bomb" src={Bomb}/> : (
                                                obj.actValue === 'f' ? <img className = "flag" src={Flag}/> : obj.actValue)
                                                }
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div class="upper-deck">
                <img className="icon try" src={Try} onClick={()=>  this.resetGame()}/>
                <img className="icon" src={Home} onClick={() => this.goHome()}/>
        
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default App;
