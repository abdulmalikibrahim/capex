import React from 'react';
import Graph from '../Component/Graph';

const Home = ({ shop, setShop, API_URL }) => {
    return (
        <div>
            <Graph shop={shop} />
        </div>
    )
}

export default Home;