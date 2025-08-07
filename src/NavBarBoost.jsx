import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Required for Bootstrap components

export default function NavBarBoost() {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a href="/" className="navbar-brand">Home</a>

              {/* Correct Offcanvas Toggle Button */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#Shahid"
                aria-controls="Shahid"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Account</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>

            {/* ✅ Offcanvas Sidebar */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="Shahid" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <div>
                  Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                </div>
                <div className="dropdown mt-3">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Dropdown button
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className='carousel slie' data-bs-ride="carousel" id="slider1">
        <div className='carousel indicator'>
           <button type="button" data-bs-target="slider1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#slider1" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#slider1" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className='carousel-inner col-12'>
          <div className='carousel-item active col-12'>
            <img src='https://www.w3schools.com/howto/img_mountains_wide.jpg' className='img-fluid'></img>
          </div>
          <div className='carousel-item  col-12'>
            <img src='https://www.w3schools.com/howto/img_mountains_wide.jpg' className='img-fluid'></img>
          </div>
          <div className='carousel-item col-12'>
            <img src='https://www.w3schools.com/howto/img_snow_wide.jpg' className='img-fluid'></img>
          </div>
        </div>
        {/* Next Button and Previous Button */}
         <button class="carousel-control-prev" type="button" data-bs-target="#slider1" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#slider1" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  {/* accourdien */}
  <div className='container-fluid bg-secondary-subtle'></div>
  <div className='container'>
    <div className='row justify-content-center'>
      <div col-12 >
        <h1 className='text-center fw-bold'>Here Some Important Question <br></br>FAQ?</h1>
        <p>Lorem  Corporis nulla in, fugiat vero quam facilis.</p>
        <div class="accordion accordion-flush" id="accordionFlushExample">
           <div class="accordion-item">
            <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
    </div>
           </div>
           <div class="accordion-item">
            <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item display #2
      </button>
    </h2>
    <div id="q2" class="q2" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
    </div>
           </div>
           <div class="accordion-item">
            <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #3
      </button>
    </h2>
    <div id="q3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
    </div>
           </div>
           <div class="accordion-item">
           <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #4
      </button>
    </h2>
    <div id="q4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
    </div>
           </div>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
  );
}
