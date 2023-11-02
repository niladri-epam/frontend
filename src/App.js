
import NavbarComponent from './components/Navbar';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div style={{    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    flexWrap: 'wrap',
    margin: '30px auto'}}>
        <ProductsList />
      </div>
    </div>
  );
}

export default App;
