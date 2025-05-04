import React from 'react';
import Bar from './components/task-bar/bar';
import './home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home__background"></div>
            <Bar />
        </div>
    );
};

export default Home;