import React, {Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        matrix : [],
        minimumTime : 0,
        isBombPlaced: false,
        level: 0

    }
    initializeMatrixHandler = (num) => {
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
        debugger;
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
        // let randomNo,randomNoArr = [],digits; 
        // let arr = [];
        // while( arr.length < 1 || (arr[0] === arr[1] || arr[1] === arr[2] || arr[2] === arr[0]) || arr.includes(0) || arr.includes(obj.i) || arr.includes(obj.j)) {

        //     randomNo = Math.floor(Math.random() * (999-100) + 100);
        //     digits = randomNo.toString().split('');
        //     randomNoArr = digits.map(Number);
        //     arr = randomNoArr; 
        // }
        // let bombPlaces = [],i,j,laststr,revStr;
        // randomNo = randomNo.toString();
        // for (i = 0 ; i < randomNo.length ; i++) {
        //     if(i === randomNo.length - 1) {
        //         laststr = randomNoArr[0].toString().concat(randomNoArr[i].toString()); 
        //         revStr = laststr.split('').reverse().join('');             
        //     } else {
        //         j=i+2;
        //         laststr = randomNo.substr(i,j);
        //         revStr = (randomNo.substr(i,j)).split('').reverse().join('');      
        //     }
        //     bombPlaces.push(revStr);
        //     bombPlaces.push(laststr);
        //     bombPlaces.push(randomNoArr[i].toString().concat(randomNoArr[i].toString()));
        // }
        
        // this.bombPlaceHandler(bombPlaces,matrix)let matrix= arr.map((data)  => {
        //     return data.map( val => {
        //         return val = {...obj};
        //     })
            
        // });
        
    }
    // bombPlaceHandler = (bombPlaces,arr) => {
    //     var obj = {value: 0, i:0,j:0};
    //     var modifiedArr= arr.map( data => {
    //         return data.map( val => {
    //             return val = {...obj};
    //         })
            
    //     })
    //     console.log(bombPlaces);
    //     let i=0,j=0,k;
    //     for ( k=0; k < bombPlaces.length ;k++) {
    //         debugger;
    //         i = parseInt(bombPlaces[k]) % 10;
    //         j = parseInt(bombPlaces[k]/10) % 100;
    //         modifiedArr[i][j].value = '*';
    //         modifiedArr[i][j].i = i;
    //         modifiedArr[i][j].j =j;

    //     }
    //     this.fillNumbersHandler(modifiedArr);
    // }
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
       debugger;
    console.log(matrix);
    //   if(event.button === 0 && isDirectElement) {
    //       if(matrix[s.i][s.j].actValue === 'f') {
    //         matrix[s.i][s.j].actValue = '' ;
    //       } else {
    //         matrix[s.i][s.j].actValue = 'f' ;
    //       }
    //       this.setState({matrix:matrix,isBombPlaced:isBombPlaced});
    //       return;
    //   } 

    let i = s.i,j=s.j,arr=matrix,rowLimit = matrix.length-1,columnLimit = matrix.length-1; 
    if(arr[i][j].value === '*' && isDirectElement) {
        document.getElementById('gameOver').innerHTML = "gameOver";
        return;
    }  
    if(arr[i][j].value !== "" && isDirectElement && arr[i][j].value !=='s') {
        arr[i][j].actValue = arr[i][j].value;
        this.checkGameOver(matrix);
        this.setState({matrix:arr,isBombPlaced:isBombPlaced});
        return;
    }
    debugger;
    for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
        for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
            if(arr[x][y].value !== "" && arr[x][y].value!== '*' && arr[x][y].value!=='s') {
                arr[x][y].actValue = arr[x][y].value;
            } else {
                if(arr[x][y].value !== 's') {
                    arr[x][y].value = 's';
                    this.showValue(arr,arr[x][y],false,isBombPlaced,event);
                }
            }
        }
    }
    console.log(arr);
    debugger;
        this.checkGameOver(matrix);
     this.setState({matrix:arr,isBombPlaced:isBombPlaced});
   }
   setFlag = (matrix,obj,event) => {
      debugger; 
    if (event.button === 0 && matrix[obj.i][obj.j].actValue !== 'f') {
        matrix[obj.i][obj.j].actValue = 'f'
    } else {
        if(event.button === 0 && matrix[obj.i][obj.j].actValue === 'f') {
            matrix[obj.i][obj.j].actValue = '';   
        }
    }
    this.checkGameOver(matrix)
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
            } if(s.value === s.actValue )  {
                count++;
            }
            return count;
            
        }));
    });
    if(count === Math.pow(matrix.length,2)) {
        console.log('u won');
        document.getElementById('gameOver').innerHTML = "u won!";
        return;

    }
   }
  
    render() {
       let matrix = [...this.state.matrix];   
        return(
            <React.Fragment>
            <div className = "gameName">MINESWEEPER</div>
            <div className = "wrapper" id="wrapper">
                <button className="button" onClick={() => this.initializeMatrixHandler(5)}>Easy</button><br/>
                <button className="button" onClick={() => this.initializeMatrixHandler(7)}>Medium</button><br/>
                <button className="button" onClick={() => this.initializeMatrixHandler(9)}>Hard</button>
            </div>
            <div>
            <table className="table">
                <tbody>
                    { matrix.map( data => {
                        return (
                            <tr className="tr">
                                { data.map(obj => {
                                    return (
                                        <td onClick = { (event) => this.setFlag(matrix,obj,event)} onContextMenu = { (event) => this.doComputation(matrix,obj,event)} >
                                            {obj.actValue}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
            <div id="gameOver" className="gameOver"></div>
            </React.Fragment>
        );
    }
}

export default App;
