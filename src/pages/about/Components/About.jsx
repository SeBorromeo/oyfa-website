import {Component} from 'react'
import { Helmet } from 'react-helmet';
import HalfTitle from '../../../components/layout/HalfTitle/HalfTitle';
import History from './AboutHistory';
import Mission from './AboutMission';

/* Main export component to index that combines all "About" components */

export default class About extends Component{
    render(){
        return(
            <>
                <Helmet><title>About</title></Helmet>
                <HalfTitle header = 'About' imgSrc = './images/about/About_Title_Battle.jpeg'
                brightness={80} position={40}/>
                <History />
                <Mission />
            </>
        )
    }
}