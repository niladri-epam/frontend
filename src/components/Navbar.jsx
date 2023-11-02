import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


const NavbarComponent = () => {
    const [show, setShow] = useState(false)
    const [file, setFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [fileLink, setFileLink] = useState(null)

    const uploadHandler = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            await getFileUploadLink(selectedFile)
            setFile(selectedFile);
        }
        
    }

    const getFileUploadLink = (selectedFile) => {
        if(!selectedFile) return
        fetch('https://h35ykgvm59.execute-api.ap-south-1.amazonaws.com/dev/import?name=' + selectedFile.name)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
            .then((responseData) => {
          setFileLink(responseData.url);
        })
        .catch((error) => {
        });
    }

    const handleFileUpload = async () => {
        if (!fileLink) {
            return
        }
        if (file) {
            setIsUploading(true)
          const formData = new FormData();
          formData.append('file', file);
    
          // Replace 'your-api-endpoint' with the actual API endpoint
          fetch(fileLink, {
            method: 'PUT',
              body: formData,
              headers: {
                'Content-Type': file.type,
              },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            })
            .then((data) => {
                setIsUploading(false)
                setShow(false)
            })
            .catch((error) => {
                setIsUploading(false)
            });
        }
      };
  return (
      <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Store</Navbar.Brand>
          </Container>
          
          <Button onClick={() => setShow(!show)} className="d-flex" variant="primary">Add Product</Button>
          </Navbar>
          <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
              <Modal.Body>
              <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select CSV(comma seperated)</Form.Label>
        <Form.Control type="file" onChange={uploadHandler}/>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
                  {
                      fileLink ? isUploading ? <Button variant="secondary" onClick={handleFileUpload} disabled>
                      Uploading...
                    </Button> : <Button variant="primary" onClick={handleFileUpload} >
                      Upload
                    </Button> : <Button variant="primary" onClick={handleFileUpload} disabled>
            Upload
          </Button>
          }
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default NavbarComponent