
import React,{useState,useEffect} from 'react';
 import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import BookCard from '../Books/BookCard';
import { Carousel } from 'react-bootstrap';
import slide1 from '../../assets/BOOKS-IN-BLOOM-2880x998.jpg';
import slide2 from '../../assets/April-2880x998.jpg';
import slide3 from '../../assets/March-bestseller-2880x998.jpg';
import slide4 from '../../assets/Shakespeare-banner-2880x998.jpg';
import slide5 from '../../assets/New-Arrivals-Feb-2880x998.jpg';
import Image  from '../../assets/libr1.jpg'


export default function Home() {
  const [books, setBooks] = useState([]);
  const [Newbooks, setNewBooks] = useState([]);
    const [Topbooks, setTopBooks] = useState([]);
  const navigate = useNavigate();



// ==========================

  
  async function getData() {
  try {
    const response = await axios.get('https://shelfshare-v2.vercel.app/api/book?page=1&limit=8&sort=-soldTimes');
    console.log(response.data.books);
    setBooks(response.data.books); 
  } catch (error) {
    console.error('هناك خطأ في تحميل البيانات:', error);
  }
}  useEffect(() => {getData()}, []);
// ==============
  async function setData() {
  try {
    const response = await axios.get('https://shelfshare-v2.vercel.app/api/book?page=1&limit=4');
    console.log(response.data.books); 
    setNewBooks(response.data.books); 
  } catch (error) {
    console.error('هناك خطأ في تحميل البيانات:', error);
  }
}

  useEffect(() => {setData()}, []);

    async function petData() {
  try {
    const response = await axios.get('https://shelfshare-v2.vercel.app/api/book?page=1&limit=6&sort=-rate');
    console.log(response.data.books); 
    setTopBooks(response.data.books); 
  } catch (error) {
    console.error('هناك خطأ في تحميل البيانات:', error);
  }
}
  useEffect(() => {petData()}, []);

  return (
    <div className="my-3 container-fluid  " >  <Carousel className='border-4 border-double'style={{ borderColor: 'rgb(137, 75, 0)' }} fade interval={3000}>
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="Slide 1" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="Slide 2" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide3} alt="Slide 3" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide4} alt="Slide 4" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide5} alt="Slide 5" />
      </Carousel.Item>
    </Carousel> 







<div className=" mt-4 pb-5 container border-t-5 border-b-4  border-double"style={{ borderColor: 'rgb(137, 75, 0)' }}>
     <div className='pt-2'><h2>Recently Added
</h2></div>
     <div className=" grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:grid-cols-1 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-5 md:pt-0  " > 
         {Newbooks.map((book) => (
           <BookCard book={book} key={book._id} />)
      )}
      </div>
   </div>

 <div className=" mt-4 pb-5 container border-t-5 border-b-4  border-double"style={{ borderColor: 'rgb(137, 75, 0)' }}>
  <div className='pt-2'><h2>Top Books</h2></div>
   <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-5 md:pt-0 " > 
         {Topbooks.map((book) => (
           <BookCard book={book} key={book._id} />)
      )}</div>
      </div>


<div className="container my-5">
  <div className="row align-items-center">

    <div className="col-12 col-md-8 mb-3 " id='about'>
      <div className="card-body">
        <h5 className="card-title mb-3 fs-2" style={{ color: 'rgb(137, 75, 0)' }}>
          About Shelf Share
        </h5>
        <p className="card-text fs-5">
          Self Share is an online book space where readers discover, share, and connect over great books.
          <br />
          We offer a curated selection across genres and give readers a voice to recommend and explore stories together.
          <br />
          It's more than a bookstore — it's your shared shelf.
        </p>
        <p className="card-text">
          <small className="text-muted">Thank you</small>
        </p>
      </div>
    </div>

    <div className="col-12 col-md-4 text-center">
      <img
        src={Image}
        alt="Card image"
        className="img-fluid border-double border-5"
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "0 0.25rem 0.25rem 0",
          borderColor: 'rgb(137, 75, 0)'
        }}
      />
    </div>
  </div>
</div>


 


      <div className="mt-4 container pb-5 border-t-5   border-double" style={{ borderColor: 'rgb(137, 75, 0)' }}>
      <div className='pt-2'><h2>For You</h2></div>
             <div className=" grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-5 md:pt-0"> 
         {books.map((book) => (
           <BookCard book={book} key={book._id} />)

      )}</div>
      <div className=" w-100"><button
      onClick={() => navigate('/books')}
      className="mt-4 mb-4 mx-4 inline-flex items-center gap-2 px-4 py-2 rounded-pill transition"
      style={{
        border: "2px solid rgb(137, 75, 0)",
        color: "rgb(137, 75, 0)",
        backgroundColor: "white",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgb(137, 75, 0)";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "white";
        e.currentTarget.style.color = "rgb(137, 75, 0)";
      }}
    >
      See all Books
      <span className="text-lg">→</span>
    </button>
</div>
       
    </div>
    </div>

  
  
  );
}

   