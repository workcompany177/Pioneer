// contents/grade1/FilesGrade1.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

function FilesGrade1() {
  const [filesData, setFilesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade1/files.json'
        );
        if (!res.ok) throw new Error('Failed to fetch files');
        const data = await res.json();
        setFilesData(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, []);

  const handleOpenModal = (file) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  return (
    // خلفية مخصصة
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #b21f1f, #b21f1f, #3a1c71)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container style={{ direction: 'rtl', color: '#fff', paddingTop: '40px' }}>
        <h2 className="mb-4" style={{ textAlign: 'center' }}>
          ملفات الصف الأول الثانوي
        </h2>

        <Row className="gy-4 justify-content-center">
          {filesData.slice().map((file, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => handleOpenModal(file)}
              >
                <Card.Img
                  variant="top"
                  src={file.thumbnail}
                  alt="File thumbnail"
                  style={{ borderRadius: '10%' }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* مودال عرض الملف */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton />
          <Modal.Body>
            {selectedFile && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  title="File Preview"
                  src={`https://drive.google.com/file/d/${selectedFile.id}/preview`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
                {/* Overlay للتشويش على أيقونة جوجل درايف */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    zIndex: 9999,
                    cursor: 'default',
                  }}
                />
              </div>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default FilesGrade1;
