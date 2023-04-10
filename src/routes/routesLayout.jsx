import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Cards from '../components/Cards'
import CardDetails from '../components/CardDetails'
import DetailedCart from '../components/DetailedCart'

const routesLayout = () => {
    return (
        <Routes>
            <Route path='/' element={<Cards/>} />
            <Route path='/cart/:id' element={<CardDetails/>} />
            <Route path='/detailed-cart' element={<DetailedCart />} />
        </Routes>
    )
}

export default routesLayout