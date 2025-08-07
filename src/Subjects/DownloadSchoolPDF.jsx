// components/DownloadPDF.jsx
import { PDFViewer } from '@react-pdf/renderer';
import { SchoolLeavingPDF } from './SchoolLeavingPDF';

export default function DownloadSchoolPDF() {
  // let navigate=useNavigate()
  // const handleClose = () => {
  //   navigate('/topics1');
  // };  

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f8ff', width: '800px', margin: '0 auto' }}>
    

      {/* PDF Download Link */}
      {/* <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <BlobProvider document={<SchoolLeavingPDF />}>
          {({ url, loading }) =>
            loading ? (
              <p>Generating PDF...</p>
            ) : (
              <a
                href={url}
                download="School_Leaving_Certificate.pdf"
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  position:'relative',
                  left:'270px',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                Download PDF
              </a>
            )
          }
        </BlobProvider>
      </div> */}

      {/* PDF Preview Viewer */}
      <div style={{ border: '1px solid #ccc', height: '600px' }}>
        <PDFViewer width="100%" height="100%">
          <SchoolLeavingPDF />
        </PDFViewer>
      </div>
    </div>
  );
}
