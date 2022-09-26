import '../App.css';
import axios from 'axios';
import { useEffect,useReducer ,useContext} from 'react';
import logger from 'use-reducer-logger';
import {Store1} from '../Store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter ,Route,Routes ,Link, useNavigate,Navigate} from "react-router-dom";
import CheckSteps from '../components/CheckSteps';
import LoadingSign from '../components/LoadingSign';
import MessageBox from '../components/MessageBox';
import {getError} from '../utils';
import { Card, ListGroup } from 'react-bootstrap';
import  Button  from 'react-bootstrap/Button';


const reducer=(state,action)=>{
  switch(action.type)
  {
    case 'FETCH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,prodavnica: action.payload,loading:false};
    case 'FETCH_FAIL':
      return {...state,loading:false,error:action.payload};
    default:
      return state;
    
  }
};

function CartScreen()
{
  const navigate=useNavigate();
 console.log("eheeek");
 const {state,dispatch:cxtDispatch}=useContext(Store1);
 const{
   cart:{cartItems},}=state;

   const updateCartHandler=async (i,quantity)=>
   {
    const{data}= await axios.get(`http://localhost:3000/api/v1/products/${i._id}`)
    if(data.countInStock<quantity)
  {
    window.alert('Proizvod je nedostupan');
    return;
  }
  cxtDispatch({type:'CART_ADD_ITEM',payload:{...i,quantity}});
   }

   const removeItemHandler=(i)=>{
     cxtDispatch({type: 'CART_REMOVE_ITEM',payload:i});
   }

const buyHandler=()=>{
  navigate('/login?redirect=/placeorder');
};


 return(
   <div>
   <h1>Korpa</h1>
   <CheckSteps step1 step2 ></CheckSteps>
   <Row>
     <Col md={8}></Col>
     { cartItems.length === 0 ? (
         <MessageBox>Korpa je prazna. <Link to="/">Idi u kupovinu!</Link></MessageBox>
       ):
       (
         <ListGroup>
           {cartItems.map((i)=>(
             <ListGroup.Item key={i._id}>
               <Row className="align-items-center"></Row>
               <Col md={4}>
                <img
                src={`http://localhost:3000/${i.image}`}
                alt={i.name}
                className="img-fluid rounded img-thumbnail"
                ></img>{' '}
                <Link to={`/product/${i._id}`}>{i.name}</Link>
               </Col>
               <Col md={3}>
                 <Button variant="light" 
                    onClick={()=>updateCartHandler(i,i.quantity-1)}
                 disabled={i.quantity === 1}
                 >
                   <i className="fas fa-minus-circle"></i>
                 </Button>{' '}
                 <span>{i.quantity}</span>{' '}
                 <Button 
                 variant="light"
                 onClick={()=>updateCartHandler(i,i.quantity+1)}
                  disabled={i.quantity === i.countInStock}>
                   <i className="fas fa-plus-circle"></i>
                 </Button>{' '}
               </Col>
               <Col md={3}>{i.price} rsd</Col>
               <Col md={2}>
               <Button variant="light" onClick={()=> removeItemHandler(i)}>
                   <i className="fas fa-trash"></i>
                 </Button>{' '}
                 </Col>

             </ListGroup.Item>
           ))}
         </ListGroup>
       )
     }
     <Col md={4}>
       <Card>
         <Card.Body>
           <ListGroup variant="flush">
             <ListGroup.Item>
             <h4>
                Ukupno : 
                {cartItems.reduce((a,c)=>a+c.price*c.quantity,0)} rsd
               <h5 style={{color:"gray"}}> ({cartItems.reduce((a,c)=>a+c.quantity,0)}{' '}
                proizvoda)</h5>
             </h4>
             </ListGroup.Item>
             <ListGroup.Item>
               <div className="d-grid">
                 <Button
                 type="button"
                 variant="primary"
                onClick={buyHandler}
                 disabled={cartItems.length===0}>
                   Kupi
                 </Button>
               </div>
             </ListGroup.Item>
           </ListGroup>
         </Card.Body>
       </Card>
     </Col>
   </Row>
   </div>
 );
}
export default CartScreen;