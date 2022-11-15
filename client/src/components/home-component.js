import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Uvic Carpool Program</h1>
            <p className="col-md-8 fs-4">
              This website is for UVic student who want a carpool to Swartz Bay.
              Passengers will have easier way to terminal. Drivers will have
              less pressure on fuel bills.
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              Let's start
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a passenger</h2>
              <p>You can find people who also go to Swartz Bay from UVic</p>
              <button className="btn btn-outline-light" type="button">
                Login or sign up
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>As a Driver</h2>
              <p>
                You can register as a driver and start public trip from UVic to
                Swartz Bay. This website is for practice purposes only, please
                do not provide any personal data such as credit card numbers.
              </p>
              <button className="btn btn-outline-secondary" type="button">
                Public your trip today
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2022 Qixing Yu
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
