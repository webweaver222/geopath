import React from 'react'

import {ServiceConsumer} from '../service-provider'


const witheService =  (Wrapped) => {
    return (props) => {
        return (
            <ServiceConsumer>
                {
                    (service) => {
                        return (
                            <Wrapped {...props} googleMapsService={service} />
                        )
                    }
                }
            </ServiceConsumer>)

    }
}

export default witheService



