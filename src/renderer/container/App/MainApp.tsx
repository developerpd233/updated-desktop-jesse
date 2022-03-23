import React, { Fragment } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import App from './routes'

const MainApp: React.FC = () => {
    console.log('mainAPp')
    return (
        <Fragment>
            <Header/>
            <App />
            <Footer />
        </Fragment>
    );
}

export default MainApp