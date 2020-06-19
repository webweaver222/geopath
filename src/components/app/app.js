import React, {useEffect} from 'react'


import './app.sass'
//import Preloader from '../preloader'
import Map from '../map/map'
import Input from '../input'


const App = () => {

    
 
    return (
        <div className="app">
                <Input/>
            <div className="map-wrapper">
                <Map/>
            </div>
        </div>
    )
}

export default App
