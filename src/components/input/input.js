import React from 'react';
import {connect} from 'react-redux'

const Input = ({input, onInputChange, onEnterAdrerss = null}) => {
    return ( 
        <div className="input">
            <input type="text" onKeyDown={onEnterAdrerss} 
            value={input}
            onChange={(e) => onInputChange(e.target.value)}/>
        </div>
     );
}


const mapStateToProps = ({input}) => {
    return {
        input
    }
  } 
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onInputChange: (adress) => dispatch({type:'INPUT_CHANGE', payload: adress})
    }
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(Input)