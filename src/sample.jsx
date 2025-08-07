import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faCheckCircle, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Sample.css';

export default function Sample() {
  // Function to scroll to top when modal is opened
  const handleModalOpen = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-fluid py-2 shadow-lg bg-white">
      <div className="row">
        <figure className="col-lg-6 col-12 text-lg-start text-center m-0 pt-0">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIA4AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcDAv/EAEAQAAEDAwIEAwUFBgILAAAAAAEAAgMEBRESIQYxQVETYZEUInGB8BUjMqHBBxZCVrHRYvEkNVJUVZKTssLS4v/EABgBAQEBAQEAAAAAAAAAAAAAAAACAwEE/8QAJhEBAAICAQMDBAMAAAAAAAAAAAECAxESEyFBBCIxFCNhkTKBwf/aAAwDAQACEQMRAD8A7iiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIMJlRV/u8dnoHVMoLnag1jM41OPL68iogcS3n+W6r1P9lpXFa0bhjfPSs6lbCUyqmeJbz/LdV6n+ykOHr6Lu2ZkkDqepgfpkhcdx5/1S2K1Y2V9RS08YTqLGVlZthERAREQEREBERAREQEREBERAREQEREBF8uVbvPEstDchQUNG+tnDNb2Mcct7dD9EKqUm86hF8laRuyzLzc7SCS7AG5JVV/eW+fy3Uep/so698Q3qW2VDDZp6QObpdOSTpB27D16ZWsenvM+P3DC3qqRG+/6lsU7v3n4pMwaTbrcfcPSST/MfkO6ujVCcI01LT2Kl9kcHCRutzx/E48/ryU6FOW27aj4hfp66ryn5nuFU3iVklkvFPfaVhMTz4dW0fxDbB+uwVyK07pT09Tb6iGrx4LmHUT08/lzXMd+Nvw7npzp+YetPMyeNksTtTHtDmuHULYXOeGr3dKO3mCkts1fTRyERyDIwO3X6KmP3lvf8t1Hq7/1WlvT2i0x/sMsfq6WrEzv9StyKp0XFVS65QUl0t0lCJ8iN73EZPTYgfRCtTSsr47Unu3x5a5P4vpERQ0EREBERAREQEREBERAREQFjKysFBH3q5R2u2zVc38A91ud3HoFEcGW6SOCS51x1VlcdZJG4b0H6+nZaPFBNXxLbKCv9y3n32npK/sf6fPz2ubAAMAABbT7McRHl5a/cyzM/FX1uvCogjnhfDK3XHI3S5pHMLYWFi9MwpHDUklhvs9iqnZgkdrpXnbn0+Y/MeauzSqh+0KKBlBT1YeWVsUw8BzfxE9vyz8kjuPGBY0i1UpGOrt/+5em9OpEXh4seTo2nHPeI+NLgSqfxtXSzyU9kod6irPv46N8/jv8gV9G48Y/8Jo/+b/6WtwWz2y83Our/wDWLHaDGf4ByyPTHy80pj4bvPfTuTL1NY67jf8AXZabTQRW2gipIB7sY59z1K3gmFlebe53L11iIjUILiq0C7210bNp4vvIT/iH1j07LHCl3N0tjTLkVUJ8OYHmCOv15qccqWP9D498O1+82oj1VcY5MPPP6/PzW1PfSaz47sMn27xePPaV1ysr5C+li9IiIgIiICIiAiIgIixlBlERAREQV/i63QXG16JZY4ZWODoZHv0gO7E/D62W7aJ5XWmGWtmgc9rDrljkBY7HM5+t16XqgZdbXU0MuNM0Zbk9D0PqqHa74+m/Z3XU7xitpXOogzG+p34cD5n0Vcp48URSIvzdDgqoagH2eaOXHPQ8Ox6FI6unkkMcU8T3jOprXgkLn/BJPDN7u1lrHANZC2pa/kCGgE/k78ipH9n0TnW64X6aPM1fNJI3AwdDSdh88/HClaRq7PV3HiWKsrfC9gpW/csDjlzu5GMc/PoFYwuZUHElzvGupdxTQ2pxedFI+FhAHTLnDr8fTkrXHdLlRcJ1Vyunsz6qGN72ezbseBs057HY/AqrWm2t+GdaRWZmPKbqaumpQPaqiKHPIyPDc+qgam2TuvtNeLK+ne1401Q17PG3LGen9AobhThOjvFuZeOIBJW1tXl3vyOAYM9MY+PlyU7Z+EbdZrs6soHSsYYy0U5eS0En8XflkbpW01+Hb44vHdYgcrOVVrbcq6bji6WySoc6kpoWPjZoaMFwadzjPUrNwuVfFx1bbXHUllHUQOkezS07gO6kZ6BStYqkyCFzoQDIAdIccAnzKg+GbNPQe1VNwcx9fVPLpC3cBudgPrt2UTxjd7jQ8QUNHSXeG3U9REXPknjYWMIzuS4fqtWm4gulLe7fSNvVDfI6qXRK2mY3VCMgast26k79lUWmKzEeUWpE2i0+HQQs5VO47u9ytc9ojtlYym9rlMT3ysa5g3aMnPLGV4UB4mqaqJjOJbXVNY5rpY4GtJcwOGdwNtsqVLytaWsp4ZPDmnjjdjOHvA2+gtlQ114ett1qRPWxOkkDQ0feOAAHw+KqvHfuTebRHt+W99oUn+90/wD1R/de0UrJmNfG4OY4Ahw6hc+4V4ettxluLayJz/AnLY8Pc3Aye3NTPE09TYrZborXUeA0SNgy9ocNOnYnPwC2vhrF+FZ7vPT1Fun1Lx2WzKbd1TIH8QVMojgv9vldjUWMaCcA78h5rf4kvNTSVNNbra1jq2q5GTkwd8evoVE4p5aidrj1FePKY0smQmR3VWbS8UweG8XKmqgXAPa6ENDRnoRhfXFFyqLdW2oNqvAgmlLZ3YbjAx35dVzpzM6iduzm41m1omFmLlD0V3NVcqylDHg0xb+IbOBA5befQn5clEcUcSxQ25r7Pc4X1AkGRGWvOnB57FWeKFg0uJcXdz1+Q2XLUtWsTPlVMtb2mtfDaREUNRERBggHmFzqewzn9ompsNT9mPmZVyHwneGZWtON+XM889cc10ZfJYP1Qc6/aXZ62pr6SrtNPUSzSQvgnMLC73fPHfUVebdSMoLbT0lOMsp4msaOWrAW5jPNZAQc1raaOZ723XgOd9W4nMlG73HHvlvL5qZ4R4cqKfhSptd0BjFW5/3YfqMLXDlnvnf4q4YWQEHO7TU8R8JQ/Zc9mluVJG4+zz02ScZzjYHv1xv3U9ZqriS5XFtVW0Mdut4a5vs8j9UjicYdsNuXlz+asunyWcDsgo1xjuli4yqLzTW2avo6ynaxzafd7HANHLf/AGfz5pao7pe+M4rzU2yago6aAxsbOMPcSCOWO7j6K8ELOEFE41o6mXie21bbRNcqWCFwljZGHA5J232Wm+gqbjdrY+0cNS2Z1PUCSSpfpYXMHMYHPb6xldAr5jT0VRM0ZMcTngfAZ/RaP2lJptH3bP8ATfx7/h+7LtvTCCuftFo6mqqLK+nts1dHTzOklhZGSC3Lcgncb7rXttxkoajXRcEVFGZMMe9jcDSSN3ADcA/r3Vqpr9Q1Doi10jGSNc5jpInNa7SMuwT239CvGovPiUtNPSskY2SpijzLEWhzXnmM89kE4SsHHZRX2oyWamFNKDFL4obqY4+LpHNruWM9dwRyUbS3qpkt8U800UZdaYqov8MuAkcNzgHceSD44LpqinnuzqinlhMtSXs1sLdQyeWcLHHdLPVU1CynpH1OioD3sa0nLcHI/NS097o6ad0Mxm1MexkjxA7RGXYxl3IZyOvVZlvFLHVtpy2dznTCEPZC4t14zgn4f5rXqz1Oo8/08dLp7Vulrn0Ehno+EpoJNJYXMGNvPA35Le4nt9aLlR3m2RePNSjS+HOHPbvy9SFuXm8Poa1sBqaCmYad0pkq3FocQ4DAOfPzXky/vElLLPTStZNQe0GGOJ0j2nI7chgnmB+i71vdyiHPp914zLxF8u9aWxW+yTQyEjMlVljBv9f2Timimra6zA0rpomTEzhrdTQ0457KWnvFLTxxSvMphe1r/GbC4xtaeRLsYA/p17r6+1KYTzwMEz5KfaXRC52k4BA25nBGwyVMZONt1hU4ZmvG1toDi+w04tLG2u3R+P4oA8GPfGD2VtiJLGnGMgc+ah6u/wAMNMZ46eoe9tTHA+J0Tg9pcR0x2Ix35c1Mxu1sa8tc3Izhwxhcte1qxE+FUxVpabR5eiIihqIiICIiAiIgIiICIiAiIg8aiJk0L4n50vaWHHY7KHorXWxy0IramCSG3tIi8NhDpDp0guycD3Sdu5yp5YwOwQVey22umoba+ofExlLG50LHRO1Fzmlo1gnkATsOeeiz+7cssT4Z5Y46d80L/ZoC4RgNJLtOTlurIyBtgd8lWfA7BZwgg6azTQvpG+O10VGZWRDByI3DDWk/4eXmAFqs4dqG29lKaiLa2NoXOwcZbycFZsIghKmzySx3JolYPa5I3jY+7oDR/wCKiD4sV4mkbAJnmuDo6d/iNI2DPEAGWkadTtXqQeVyWMDsgia6gq5Lk2spX0+0Bhc2dpIOXA5GPgvKgsrqIR4mDgyldBu3G7nasgdAOWFN4HZZQVOt4bq6mjbSNqKd0fsccAdIHHwi0YLmtzjfbfn8VJS2qf2e6tp6rw5a2YSscMjT7jG4yN99J3HLKmkwOyCtMsFQyCq0Ppo3yzQzRsY06GmMg4PU5xz57qww6tDS/TqIy7Sds+S9EQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k="
            className="img-fluid"
            alt="Career Opportunities"
          />
        </figure>
        <div className="col-lg-6">
          <div className="btn-outer d-flex justify-content-end gap-2">
            <button className="btn btn-outline-success me-2">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" /> Chat with us
            </button>
            <button className="btn btn-outline-primary">
              <FontAwesomeIcon icon={faPhone} size="2x" /> Call with us
            </button>
          </div>
        </div>
      </div>
      <section className="container-fluid py-lg-5 py-sm-4 py-2">
        <div className="row justify-content-between gy-4 align-items-center">
          <div className="col-lg-6">
            <h1 className="fs-1 text">
              Career Opportunities <br /> <span>in Digital Marketing</span>
            </h1>
            <p>Digital Marketing so good you only pay after placement</p>
            <ul className="m-0 p-0">
              <li className="mb-3">
                <FontAwesomeIcon icon={faCheckCircle} size="2x" color="green" /> Specialization in Social Media Marketing Placement
              </li>
              <li className="mb-3">
                <FontAwesomeIcon icon={faCheckCircle} size="2x" color="green" /> You will get a package of at least 5 LPA to 10 LPA
              </li>
              <li className="mb-3">
                <FontAwesomeIcon icon={faCheckCircle} size="2x" color="green" /> Only 50 seats available
              </li>
            </ul>
            <div className="btn-banner d-flex gap-3">
              <button className="btn btn-primary">Book 2 Days for Demo</button>
              <button
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleModalOpen}
              >
                <FontAwesomeIcon icon={faCloudArrowDown} size="2x" /> Download Curriculum
              </button>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="form-banner shadow-lg p-4">
              <h3>Book Your Classes Now</h3>
              <p>Your seat is reserved. How can you use it?</p>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  aria-describedby="nameHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="User Email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone No</label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">+91</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="User Phone No"
                    aria-label="Phone Number"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-primary">Register Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container shadow-lg mt-5 footer-section">
          <div className="row p-4">
            <div className="col">
              <h1>100+</h1>
              <p>Students Trained</p>
            </div>
            <div className="col">
              <h1>100+</h1>
              <p>Students Trained</p>
            </div>
            <div className="col">
              <h1>100+</h1>
              <p>Students Trained</p>
            </div>
            <div className="col">
              <h1>100+</h1>
              <p>Students Trained</p>
            </div>
            <div className="col">
              <h1>100+</h1>
              <p>Students Trained</p>
            </div>
          </div>
        </div>
      </section>
      <section className='container-fluid bottom-section p-5'>
        <div className='container'>
        <div className='row mb-4'>
        <h1 className='text-left'>Key Highlight of the Course</h1>
        <p>here yuou can see Your course now Where are you</p>
        </div>
            <div className='row gy-4'>
            <div className='col-lg-4 col-sm-6 col-12 shadow-lg  g-3'> 
            <h4>Asignment & Module Test</h4>
            <p>Test Your Knowledge</p>
            </div>
            <div className='col-lg-4 col-sm-6 col-12 shadow-lg g-3'> 
            <h4>Asignment & Module Test</h4>
            <p>Test Your Knowledge</p>
            </div>
            <div className='col-lg-4 col-sm-6 col-12 shadow-lg g-3'> 
            <h4>Asignment & Module Test</h4>
            <p>Test Your Knowledge</p>
            </div>
            <div className='col-lg-4 col-sm-6 col-12 shadow-lg g-3'> 
            <h4>Asignment & Module Test</h4>
            <p>Test Your Knowledge</p>
            </div>
            <div className='col-lg-4 col-sm-6 col-12 shadow-lg g-3'> 
            <h4>Asignment & Module Test</h4>
            <p>Test Your Knowledge</p>
            </div>
            <div className='col-lg-4 col-sm-6 col-12 shadow-lg g-3'> 
            <h4>Asignment & Module Test</h4>
            <p>Test Your Knowledge</p>
            </div>
            </div>
            
        </div>
      </section>
    </div>
  );
} 