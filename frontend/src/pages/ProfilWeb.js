import React from "react";
import Profil from "../components/Profil";

function ProfilWeb() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Profil</h1>
      <div className="row">
        <div className="col-md-6">
          <Profil />
        </div>
      </div>
    </div>
  );
}

export default ProfilWeb;
