import '../App.css';
import axios from 'axios';
import { useEffect,useReducer, useState } from 'react';
import logger from 'use-reducer-logger';
import Helmet from 'helmet';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Store from '../components/Store';
import NavBar from '../Navbar';
import LoadingSign from '../components/LoadingSign';
import MessageBox from '../components/MessageBox';
import {getError} from '../utils';
import NavApp from "../components/NavApp";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import  {Store1}  from '../Store';
import SearchBox from '../components/SearchBox';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SearchBoxHome from '../components/SearchBoxHome';
import HeroSection from '../components/HeroSection';

const reducer=(state,action)=>{
  switch(action.type)
  {
    case 'FETCH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,prodavnica: action.payload,loading:false};
    case 'FETCH_FAIL':
      return {...state,loading:false,error:action.payload};
      
      case 'FETCH1_REQUEST':
      return {...state,loading:true};
    case 'FETCH1_SUCCESS':
      return {...state,categories: action.payload,loading:false};
    case 'FETCH1_FAIL':
      return {...state,loading:false,error:action.payload};
    default:
      return state;
    
  }
};

function HomeScreen()
{
  const navigate=useNavigate();
  const [query,setQuery]=useState('all');
 const {state}=useContext(Store1);
 const {userInfo}=state;
if(userInfo){
    console.log(userInfo.data.user.role==='store-admin');
    console.log(userInfo.data.user.store);
    if(userInfo.data.user.role==='store-admin' ){
    console.log("eo me");
   navigate(`/admin/products`);//${userInfo.data.user.store}
    }
 }
  const [{loading,error,prodavnica,categories},dispatch] = useReducer(logger(reducer),{
    prodavnica:[],
    categories:[],
    loading:true,
    error:'',

  });
 /*  useEffect(()=>{

    const fetchData= async () =>
    {
      dispatch({type:'FETCH_REQUEST'});
      try{
         const result=await axios.get('http://localhost:3000/api/v1/stores');
         console.log(result);
        dispatch({type:'FETCH_SUCCESS',payload: result.data.data.stores});
      }catch(err)
      { 
        dispatch({type:'FETCH_FAIL',payload: getError(err)});
      }
    
    };
    fetchData();
 
  },[]); */
useEffect(()=>{

    const fetchData= async () =>
    {
      dispatch({type:'FETCH_REQUEST'});
      try{
         const result=await axios.get(`http://localhost:3000/api/v1/stores/findStores?searchQuery=${query}`);
         console.log(result);
        dispatch({type:'FETCH_SUCCESS',payload: result.data.data.stores});
      }catch(err)
      { 
        dispatch({type:'FETCH_FAIL',payload: getError(err)});
      }
    
    };
    fetchData();
 
  },[query]); 
  useEffect(()=>{
    const fetchCategories=async ()=>{
      dispatch({type:'FETCH1_REQUEST'});
      try{
        console.log("eo me");
       
        const {data}=await axios.get(`http://localhost:3000/api/v1/stores/categories`);
        dispatch({type:'FETCH1_SUCCESS',payload: data.data});

        console.log(data);
       // setCategories(data.data);
        console.log(data.data);
        console.log(categories);
      }catch(err)
      {
        toast.error(getError(err));
        console.log("eo me :(");
      }
    }
    fetchCategories();
  },[])
  function klikni()
  {
    navigate(`/search`);
  }
  
    return(
      <>
      
      
      
       
       
       {/*ovde bilo drukcije style="width: 100%; height: 300px;" */}
       <HeroSection/>
                    {/* <h1 class="display-4 fw-bolder"> Shop in style</h1>
                    <p class="lead fw-normal text-white-50 mb-0"> With this shop hompeage template</p> */}
       
       {/* <script src="finisher-header.es5.min.js" type="text/javascript"></script> */}
       <br></br>
       <header className='pretraga'> 
        <div class="col-sm-1 col-md-1">
          <NavApp  categories={categories} bul={true}/>
        </div> 
        <div class="col-12 col-sm-8 col-md-9" >
          <SearchBoxHome query={setQuery}/></div>
        <div class="col-12 col-sm-3 col-md-2 d-none d-sm-block">
          <Button onClick={klikni} class="btn btn-primary btn-lg btn-block dugmence"><i class="fa fa-search-plus" aria-hidden="true"></i> ㅤ Napredna pretraga</Button></div>
      </header>
      <div className='mian' >
             <main>
               <div className="naseprodavnice">
                <h1>Naše prodavnice</h1>
                </div>
                <div className='prodavnice'>
                   {loading ? (
                      <LoadingSign />
                   ) : error ? (
                     <MessageBox variant="danger">{error}</MessageBox>
                   ) : (
                      <Row>
                         {prodavnica.map((store) => (
                          
                            <Col key={store.name} sm={6} md={4} lg={3} className="mb-3">
                               {console.log(store)}
                               <Store store={store}></Store>
                            </Col>

                         ))}
                      </Row>
                   )}
                </div>
             </main>
       </div>
       </>
  );        


}
export default HomeScreen;