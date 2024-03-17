import {Component} from 'react'

import HalfTitle from '../../../components/layout/HalfTitle/HalfTitle';

import Calendar from './eventsCalendar';

/* Main export file to index that combines all "events" components */

export default class Events extends Component{
    render(){
        return(
            <div>
                <HalfTitle header = 'Events' imgSrc = '/images/events/Events_Title_Yogoyfa.jpeg' brightness = {70} caption='Check Instagram for latest updates' captionLink='https://www.instagram.com/oyfaatuva/' newTab = 'true'/>
                <Calendar />
            </div>
        )
    }
}