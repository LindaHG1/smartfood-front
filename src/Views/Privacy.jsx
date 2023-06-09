import { React, useState } from 'react'
import Navbar from '../Components/Navbar'
import Policy from '../Components/Policy'
import Footer from '../Components/Footer'

function Privacy() {
    
    const [allProducts, setAllProducts] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const [total, setTotal] = useState(0);

    return (
        <div>
            <Navbar
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
            />
            <Policy/>
            <Footer/>
        </div>
    )
}

export default Privacy
