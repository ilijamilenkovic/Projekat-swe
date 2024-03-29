import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Container, Form, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSign from '../components/LoadingSign';
import MessageBox from '../components/MessageBox';
import { Store1 } from '../Store';
import { getError } from '../utils';
import { Button } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, prodavnica: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

export default function AddProductScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store1);
  const { userInfo } = state;

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, { loading: false, error: '' });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  //const [image, setImage] = useState('');
  //const[images,setImages]=useState([]);
  const [category, setCategory] = useState('Hrana');
  const [store, setStore] = useState('');
  const [subcategory, setSubcategory] = useState('Peciva');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [diabetic, setDiabetic] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [vegeterian, setVegeterian] = useState(false);
  const [ecofriendly, setEcofriendly] = useState(false);
  const [pregnantfriendly, setPregnantfriendly] = useState(false);
  const [lastpiece, setLastpiece] = useState(false);
  const [faluty, setFaulty] = useState(false);
  //const [energy, setEnergy] = useState('');
  const [fat, setFat] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [protein, setProtein] = useState('');
  const [carboHydrates, setCarboHydrates] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    async function fja1() {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/v1/products/categories'
        );
        setCategories(data.data);
        console.log(data);
      } catch (err) {}
    }
    fja1();

    async function fja2() {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/v1/products/subcategories'
        );
        setSubcategories(data.data);
        console.log(data);
      } catch (err) {}
    }
    fja2();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('image', image);
      bodyFormData.append('name', name);
      bodyFormData.append('price', price);
      bodyFormData.append('category', category);
      bodyFormData.append('subcategory', subcategory);
      bodyFormData.append('countInStock', countInStock);
      bodyFormData.append('description', description);
      bodyFormData.append('diabetic', diabetic);
      bodyFormData.append('vegan', vegan);
      bodyFormData.append('vegeterian', vegeterian);
      bodyFormData.append('ecofriendly', ecofriendly);
      bodyFormData.append('pregnantfriendly', pregnantfriendly);
      bodyFormData.append('faulty', faluty);
      bodyFormData.append('fat', fat);
      bodyFormData.append('expirationDate', expirationDate);
      bodyFormData.append('protein', protein);
      bodyFormData.append('carboHydrates', carboHydrates);

      console.log(bodyFormData);

      console.log('USO SAM');
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.post(
        `http://localhost:3000/api/v1/products`,
        // {
        //   _id: productId,
        //   name,
        //   price,
        //   image,
        //   //images,
        //   category,
        //   store,
        //   subcategory,
        //   countInStock,
        //   description,
        //   diabetic,
        //   vegan,
        //   vegeterian,
        //   ecofriendly,
        //   pregnantfriendly,
        //   lastpiece,
        //   faulty: faluty,
        //   //energy,
        //   fat,
        //   expirationDate,
        //   protein,
        //   carboHydrates,
        // },
        bodyFormData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Proizvod je uspesno dodat!');

      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  // const uploadFileHandler = async (e /*,forImages*/) => {
  //   const file = e.target.files[0];

  //   const bodyFormData = new FormData();
  //   bodyFormData.append('image', file);
  //   try {
  //     dispatch({ type: 'UPLOAD_REQUEST' });

  //     const { data } = await axios.patch(
  //       `http://localhost:3000/api/v1/products/upload-image/${productId}`,
  //       bodyFormData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           authorization: `Bearer ${userInfo.token}`,
  //         },
  //       }
  //     );
  //     dispatch({ type: 'UPLOAD_SUCCESS' });
  //     setImage(data.data.image);
  //     toast.succes('Image uploaded successfully');
  //     /*if(forImages)
  //               {
  //                     setImages([...images,data.secure_url]);
  //                }
  //                else{
  //                      setImage(data.secure_url);
  //                } */
  //     console.log('ovde sam dodao sliku');
  //     setImage(data.data.image);

  //     toast.succes('Image uploaded successfully.Click on it');
  //   } catch (err) {
  //     //toast.error(getError(err));
  //     dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
  //   }
  // };

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file.size > 2048 * 1024) alert('Velicina slike mora biti ispod 2MB');
    else {
      setImage(file);
    }
  };

  const deleteFileHandler = async (fileName) => {
    //setImages(images.filter((x)=>x!==fileName));
    //toast.succes('Image deleted successfully');
  };
  function klikni() {
    navigate(`/admin/products`);
  }

  return (
    <Container className="small-container">
      <h1>Dodavanje proizvoda</h1>
      {loading ? (
        <LoadingSign></LoadingSign>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Button onClick={klikni}>Nazad</Button>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Ime</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Cena</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image file</Form.Label>
            {/* <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            /> */}
            <Image
              alt={`Upload image`}
              src={`http://localhost:3000/${image}`}
            ></Image>
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload file</Form.Label>
            <Form.Control type="file" onChange={handleFileInput} />
            {loadingUpload && <LoadingSign></LoadingSign>}
          </Form.Group>

          {/* /* <Form.Group className="mb-3" controlId="imageFile">
                            <Form.Label>Upload image</Form.Label>
                            <Form.Control type="file"  onChange={uploadFileHandler}/>
                            {loadingUpload &&<LoadingSign></LoadingSign>}
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="additionalImage">
                            <Form.Label>Nova Slika</Form.Label>
        
                            {images.length===0 && <MessageBox>Nema</>}
                            <ListGroup variant="flush">
                            {images.map((x)=>(
                                <ListGroup.Item key={x}>{x}
                                <Button variant="light" onClick{()=>deleteFileHandler(x)}>
                                <i className="fa fa-times-circle"></i>
                                </>
                                </>
                            ))}
                        </Form.Group> 

                        <Form.Group className="mb-3" controlId="additionalimageFile">
                            <Form.Label>Upload aditional image</Form.Label>
                            <Form.Control type="file"  onChange={(e)=>uploadFileHandler(e,true)}/>
                            {loadingUpload &&<LoadingSign></LoadingSign>}
                        </Form.Group> 
                        
                        
                        */}
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Kategorija</Form.Label>
            {/* <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            /> */}
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories.map((kategorija) => (
                <option value={kategorija}>{kategorija}</option>
              ))}

              {/* <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="subcategory">
            <Form.Label>Subkategorija</Form.Label>
            <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setSubcategory(e.target.value);
            }}
          >
            {subcategories.map((subkategorija) => (
              <option value={subkategorija}>{subkategorija}</option>
            ))}

            {/* <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Dostupna kolicina</Form.Label>
            <Form.Control
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="diabetic">
            <Form.Label>Dijabeticar</Form.Label>
            <Form.Check
              checked={diabetic}
              onChange={(e) => {
                setDiabetic(e.target.checked);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="vegan">
            <Form.Label>Vegan</Form.Label>
            <Form.Check
              checked={vegan}
              onChange={(e) => setVegan(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="vegeterian">
            <Form.Label>Vegeterijanac</Form.Label>
            <Form.Check
              checked={vegeterian}
              onChange={(e) => setVegeterian(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ecofriendly">
            <Form.Label>Eko</Form.Label>
            <Form.Check
              checked={ecofriendly}
              onChange={(e) => setEcofriendly(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="pregnantfriendly">
            <Form.Label>Pogodno za trudnice</Form.Label>
            <Form.Check
              checked={pregnantfriendly}
              onChange={(e) => setPregnantfriendly(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastpiece">
            <Form.Label>Zadnji komad</Form.Label>
            <Form.Check
              checked={lastpiece}
              onChange={(e) => setLastpiece(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="faulty">
            <Form.Label>Feler</Form.Label>
            <Form.Check
              checked={faluty}
              onChange={(e) => setFaulty(e.target.checked)}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="energy">
            <Form.Label>Kalorije</Form.Label>
            <Form.Control
              value={//energy}
              onChange={//(e) => setEnergy(e.target.value)}
            />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="fat">
            <Form.Label>Masti</Form.Label>
            <Form.Control
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="protein">
            <Form.Label>Proteini</Form.Label>
            <Form.Control
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="expirationdate">
            <Form.Label>Istice rok</Form.Label>
            <Form.Control
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="carbohydrates">
            <Form.Label>Ugljeni hidrati</Form.Label>
            <Form.Control
              value={carboHydrates}
              onChange={(e) => setCarboHydrates(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Dodaj
            </Button>
            {loadingUpdate && <LoadingSign></LoadingSign>}
          </div>
        </Form>
      )}
    </Container>
  );
}
