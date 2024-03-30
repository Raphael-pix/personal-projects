
import './App.css';
// import Accordion from './components/accordion';
// import RandomColorGenerator from './components/random-color';
// import StarRating from './components/star-rating';
// import ImageSlider from './components/image-slider';
import LoadMore from './components/load-more';
// import ImageSlider from './components/Image-slider-api';

function App() {
  return (
    <div className="App">
      
      {/* Project 1: Accordion  */}
      {/* <Accordion/> */}

      {/* Project 2: Random color generator  */}
      {/* <RandomColorGenerator/> */}
    
      {/* Project 3: Star rating  */}
      {/* <StarRating  /> */}
    
       {/* Project 3: image slider */}
      {/* <ImageSlider/> */}
      
      {/* Project 4: image slider using api */}
      {/* <ImageSlider url={`https://picsum.photos/v2/list`} page={1} limit={10}/> */}


      {/* Project 5: load more component */}
      <LoadMore url="https://dummyjson.com/products"/>
    </div>
  );
}

export default App;
