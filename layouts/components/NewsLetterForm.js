import React, { useState } from "react";
import { FaEnvelope, FaSignature } from "react-icons/fa";

function CustomForm() {
  const [email, setEmail] = useState("");

  const resetForm = () => {
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email && email.indexOf("@") > -1 && onValidated({ EMAIL: email });
    resetForm();
  };

  return (
    <>
      <form action="#" className="py-6" onSubmit={handleSubmit}>
        <fieldset className="relative">
          <input
            className="newsletter-input form-input h-12 w-full rounded-lg border-none bg-white px-5 py-3 pr-12 text-dark placeholder:text-xs placeholder:text-dark dark:bg-darkmode-theme-dark"
            type="text"
            placeholder="Informe seu nome"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaSignature className="absolute top-1/2 right-5 -translate-y-1/2 text-xl transition duration-75" />
        </fieldset>
        <fieldset className="relative mt-4">
          <input
            className="newsletter-input form-input h-12 w-full rounded-lg border-none bg-white px-5 py-3 pr-12 text-dark placeholder:text-xs placeholder:text-dark dark:bg-darkmode-theme-dark"
            type="text"
            placeholder="Informe seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="absolute top-1/2 right-5 -translate-y-1/2 text-xl transition duration-75" />
        </fieldset>
        <fieldset className="relative mt-4">
          <input type="checkbox" id="scales" name="scales" />
          <label>Concordo com a Política de Privacidade</label>
        </fieldset>
        <button className="d-block  btn btn-primary mt-4 w-full rounded-lg" type="submit">
          Enviar
        </button>
      </form>
      {/*status === "sending" && (
        <div className="mt-4 text-primary">enviando...</div>
      )}
      {status === "error" && (
        <div
          className="mt-4 text-red-700"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div className="mt-4 text-green-700">Enviado !</div>
      )*/}
    </>
  );
}

export default CustomForm;
