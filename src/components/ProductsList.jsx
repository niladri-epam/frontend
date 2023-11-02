import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const ProductsList = () => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://nkutuu63ah.execute-api.ap-south-1.amazonaws.com/dev/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((responseData) => {
          setProducts(responseData);
        })
        .catch((error) => {
        });
    }, [])


    return (
        <>
            {products.length ? products.map((p) => <Card style={{margin: '5px 0px 2px 0px'}} key={p.id} styles={{ width: '18rem' }}>
      <Card.Body>
              <Card.Title>{ p.title}</Card.Title>
        <Card.Text>
          {p.description}
        </Card.Text>
              <Badge bg="primary">Qty: { p.count}</Badge>
        <Badge bg="warning" text="dark">
                  ${ p.price}
      </Badge>
      </Card.Body>
    </Card>) : 'No Products Available'}
        </>
    )
}

export default ProductsList