import React from 'react';
import SideBar from './SideBar';

const Index = ({ title, setShop, Content }) => {
    return (
        <div className="p-3" style={{ background:"url(https://img.freepik.com/free-vector/blue-geometric-minimal-background_53876-99573.jpg)", backgroundSize:"100% 100%", backgroundRepeat: "no-repeat", backgroundPosition:"center", height:"100vh"}}>
            <div className='row'>
                <div className="col-2">
                    <SideBar setShop={setShop} />
                </div>
                <div className="col-10">
                    <h1>{title}</h1>
                    { Content }
                </div>
            </div>
        </div>
    )
}

export default Index;