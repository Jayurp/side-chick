import React from 'react';
import Bar from './components/task-bar/bar';
import './home.css';
import Desktop from './components/desktop/desktop';

const Home = () => {
    return (
        <div className="home">
            <div className="home__background">
                <Desktop />
            </div>
            <Bar />
        </div>
    );
};

export default Home;