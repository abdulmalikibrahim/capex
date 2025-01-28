import React from 'react';
import SideBar from '../Layout/SideBar';

const Home = ({ API_URL }) => {
    return (
        <div className='row'>
            <div className="col-3">
                <SideBar />
            </div>
            <div className="col-9">
                <Content />
            </div>
        </div>
    )
}

const Content = () => {
    return "TETS"
}

export default Home;