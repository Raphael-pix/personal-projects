
import './App.css';
import Header from './components.js/header-section/Header';
import Hero from './components.js/hero-section/Hero';
import Row from './components.js/rows/Row';
import requests from './utils/request';

function App() {
  return (
    <div className="App">
      <Header className="header-section"/>
      <Hero className="hero-section" url={requests.fetchPopular}/>
      <Row title={"trending movies"} url={requests.fetchTrending} isLarge={true}/>
      <Row title={"netflix originals"} url={requests.fetchNetflixOriginals}/>
      <Row title={"top rated"} url={requests.fetchTopRated}/>
      <Row title={"action movies"} url={requests.fetchActionMovies}/>
      <Row title={"comedy movies"} url={requests.fetchComedyMovies}/>
      <Row title={"horror movies"} url={requests.fetchHorrorMovies}/>
      <Row title={"romance movies"} url={requests.fetchRomanceMovies}/>
      <Row title={"documentaries"} url={requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
