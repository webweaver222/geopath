import React from 'react';
import {connect} from 'react-redux'


import {geocode} from '../../actions/index'

const Input = ({input, list, onInputChange, onEnterAdrerss}) => {

    
    return ( 
        <div className="input">
            <label htmlFor="">Address input</label>
            <input type="text" onKeyDown={(e) => {
                if (e.keyCode == 13) {
                    onEnterAdrerss(e)
                } 
            }} 
            value={input}
            onChange={(e) => onInputChange(e.target.value)}/>
        </div>
     );
}


const mapStateToProps = ({input, list, gms}) => {
    return {
        input,
        list,
        gms
    }
  } 
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onInputChange: (adress) => dispatch({type:'INPUT_CHANGE', payload: adress}),
        onEnterAdrerss: (e) => dispatch(geocode(e.target.value))
        
    }
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(Input)