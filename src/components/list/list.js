import React from 'react';
import {connect} from 'react-redux'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';


const List = ({list, onDnd, onDelete}) => {

    const theList = list && list.length > 0? 
    <RLDD
             items={list}
             onChange={onDnd}
             itemRenderer = { (item, idx) => {
                return (<div className="item">
                    <div className="num">{idx+1}.</div>
                    <div className="name">{item.name}</div>
                    <i className="fa fa-times" onClick={() => {onDelete(idx)}}></i>
                 </div>)
             }}
            
            
            /> :null

    return (
        <div className="list">
            {theList}
        </div>
    )
}
 
export default connect(({list}) => {
    return {
        list
    }
},(dispatch) => {
    return {
        onDnd: (newItems) => dispatch({type: 'DND_END', payload: newItems}),
        onDelete: (idx) => dispatch({type: 'DELETE_ITEM', payload: idx})
    }
})(List)