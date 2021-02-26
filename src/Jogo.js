import './styles.css'

import React from 'react'

class Tabuleiro extends React.Component{
  renderizarQuadrado(i){
    return (<Quadrado value={this.props.quadrados[i]} onClick={() => this.props.onClick(i)} />);
  }
  render(){
    return(
    <div>
      <div className="board-row">
        {this.renderizarQuadrado(0)}
        {this.renderizarQuadrado(1)}
        {this.renderizarQuadrado(2)}
      </div>
      
      <div className="board-row">
        {this.renderizarQuadrado(3)}
        {this.renderizarQuadrado(4)}
        {this.renderizarQuadrado(5)}
      </div>
      
      <div className="board-row">
        {this.renderizarQuadrado(6)}
        {this.renderizarQuadrado(7)}
        {this.renderizarQuadrado(8)}
      </div>
    </div>
    );
  }
}

class Jogo extends React.Component{
    constructor (props){
    super(props);
      this.state = {
        quadrados: Array(9).fill(null),
        xIsNext: true
      };
    }
 
  handleClick(i){
    const quadrados = this.state.quadrados.slice();
       if (calculateWinner(quadrados)){
       alert ("Jogo já acabou");
        return;
       }
    if (quadrados[i]){
      alert("Quadrado ocupado");
      return;
    }
    quadrados[i] = this.state.xIsNext ? "X" : "O";
      this.setState ({
        quadrados: quadrados,
        xIsNext: !this.state.xIsNext
      });
    }
  
  restart() {
      this.setState({
      quadrados: Array(9).fill(null),
      xIsNext: true,
      })
  }
  
  handlePLayItSelf(){
    let squareIndexToPlay = Math.floor(Math.random() * 9);
    
    while(this.state.quadrados[squareIndexToPlay]){
      squareIndexToPlay = Math.floor(Math.random() * 9)
    }
    
    this.handleClick(squareIndexToPlay);
  }
    
  render(){
    const current = this.state.quadrados;
    const vencedor = calculateWinner (this.state.quadrados);
    let status;
    if (vencedor){
      status = "Vencedor: " + vencedor;
    }
    else{
      status = 'Jogador: ' + (this.state.xIsNext ? "X" : "O");
    }
    return (
       <div className="gameContainer">
          <div className="game-board">
            <Tabuleiro quadrados={current}
                       onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
                <div>{status} </div>
                  <div><button onClick={()=> {
                        this.restart()}}>Recomeçar</button>       
                  </div>  
                  <div><button onClick={()=> {!vencedor && this.handlePLayItSelf()}}>Jogar Randomico</button>       
                  </div>  
          </div>
       </div>
    );
  }
}

class Quadrado extends React.Component{
  render(){
    return(
      <button
          className="quadrado"
          onClick={() => {this.props.onClick()}}>
        {this.props.value}
      </button>
    );
  }
}

function calculateWinner (squares){  
  
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i=0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

export default Jogo;