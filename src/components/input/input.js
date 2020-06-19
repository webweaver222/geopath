import React from 'react';
import {connect} from 'react-redux'

const Input = ({input, list, onInputChange, onEnterAdrerss}) => {

    
    return ( 
        <div className="input">
            <label htmlFor="">Address input</label>
            <input type="text" onKeyDown={(e) => {
                if (e.keyCode == 13) {
                    onEnterAdrerss()
                } 
            }} 
            value={input}
            onChange={(e) => onInputChange(e.target.value)}/>
        </div>
     );
}


const mapStateToProps = ({input, list}) => {
    return {
        input,
        list
    }
  } 
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onInputChange: (adress) => dispatch({type:'INPUT_CHANGE', payload: adress}),
        onEnterAdrerss: () => dispatch('ADDRESS_ENTER')
    }
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(Input)