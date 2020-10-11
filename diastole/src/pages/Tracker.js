import React from 'react'; 
import Chatbot from "../components/Chatbot";
import { v4 } from 'uuid';

const Tracker = () => {
    const sessionId = v4();
    return (
        <Chatbot sessionId={sessionId} /> 
    )
}

export default Tracker; 