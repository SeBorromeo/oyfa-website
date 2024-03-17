import {Component} from 'react'
import { Helmet } from 'react-helmet';
import HalfTitle from '../../../components/layout/HalfTitle/HalfTitle';
import FileGallery from './archivesFileGallery';

/* Main export file to index that combines all "archives" components */

export default class Archives extends Component{
    render(){
        return(
            <div>
                <Helmet><title>Archives</title></Helmet>
                <HalfTitle header='Archives' imgSrc='./images/archives/Archives_Title_D7_JMU.jpeg' position={15} brightness={70}/>
                <FileGallery />
            </div>
        )
    }
}