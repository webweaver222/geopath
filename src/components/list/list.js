import React from 'react';
import {connect} from 'react-redux'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';

const List = ({list, onDnd}) => {

    const renderItems = (list) => {
        if (list === null) return null
        return list.map((item, i) => {
            return <li key={i}>
                <div className="num">{i+1}.</div>
                <div className="name">{item.name}</div>
            </li>
        })
    }

    const theList = list? 
    <RLDD
             items={list}
             onChange={onDnd}
             itemRenderer = { (item, idx) => {
                return (<div className="item">
                    <div className="num">{idx+1}.</div>
                    <div className="name">{item.name}</div>
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
        onDnd: (newItems) => dispatch({type: 'DND_END', payload: newItems})
    }
})(List)