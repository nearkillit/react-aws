import React, { useState, useEffect } from 'react';
import { 
    useParams,         
    
    } from "react-router-dom";

const Reserve = () => {
        
    const { id } = useParams<string>();

    useEffect(()=>{
      console.log(id);        
    },[])

    return (
        <div>
            {id}
        </div>
    )
}

export default Reserve