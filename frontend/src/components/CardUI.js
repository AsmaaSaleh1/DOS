import React, { useState} from 'react';
import img1 from "../assets/img1.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {Modal} from './Modal'
import './style.css'
import {useAxios} from "use-axios-client";

import axios from "axios";
const Card = (props) =>{
    const [showModal, setShowModal] = useState(false);
    const { data} = useAxios({url:'http://localhost:8081/api/query/item/'+props.data.ID,method:'GET'})

    const openModal = () => {
        setShowModal(prev => !prev);
    };
    const purchase = () =>{
        axios.post('http://localhost:8082/api/purchase/item/'+props.data.ID)
    }

    return(
        <div className="card text-center">
            <div className="overflow">
                <img src={img1} alt="Image 1" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title"> {props.data.name} </h4>
                <p className="card-text text-secondary"> {props.data.topic} </p>
                <Button onClick={purchase} variant="outline-success">Purchase</Button>
                <Button onClick={openModal} variant="outline-success" className="infobtn">info</Button>
                <Modal data={data}  showModal={showModal} setShowModal={setShowModal}/>
            </div>
        </div>

    )
}

export default Card;