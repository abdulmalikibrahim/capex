import React from 'react';
import SideBar from './SideBar';

const Index = ({ shop, setShop, Content }) => {
    return (
        <div className="p-3" style={{ background:"url(Assets/background.png)", backgroundSize:"100% 100%", backgroundRepeat: "no-repeat", backgroundPosition:"center", height:"100vh"}}>
            <div className='row'>
                <div className="col-2">
                    <SideBar shop={shop} setShop={setShop} />
                </div>
                <div className="col-10" style={{maxHeight:"98vh", overflow:"auto"}}>
                    { Content }
                </div>
            </div>
        </div>
    )
}

export default Index;