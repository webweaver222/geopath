import React, {useEffect} from 'react'


import './app.sass'
//import Preloader from '../preloader'
import Map from '../map/map'
import Input from '../input'
import List from '../list'


const App = () => {

    
 
    return (
        <div className="app">
            <div className="left">
                <Input/>
                <List/>
            </div>
                
            <div className="map-wrapper">
                <Map/>
            </div>
        </div>
    )
}

export default App
