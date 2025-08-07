// components/ShowPDF.jsx
import React from 'react';
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';
import My_Document from './My_Document';

export default function PDF_Veiws() {
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{fontFamily:' "Josefin Sans", sans-serif'}}>PDF Preview</h2>

      {/* PDF Viewer */}
      <PDFViewer width="100%" height="600">
        <My_Document />
      </PDFViewer>

      {/* Download Button */}
      <div style={{ marginTop: '20px' }}>
        <BlobProvider document={<My_Document />}>
          {({ url, loading }) =>
            loading ? (
              <p>Loading PDF...</p>
            ) : (
              <a
                href={url}
                download="report.pdf"
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '5px',
                }}
              >
                Download PDF
              </a>
            )
          }
        </BlobProvider>
      </div>
    </div>
  );
}
