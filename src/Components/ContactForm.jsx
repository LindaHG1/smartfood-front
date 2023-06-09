import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assets/sass/components/_contactform.scss';
import InputsRegister from "./InputsRegister/InputsRegister";
import AOS from "aos";
import 'aos/dist/aos.css';



const ContactForm = (props) => {
  useEffect(() => {
    AOS.init({ duration: 1500 }); // inicializa AOS
  }, []);


  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fields] = useState([
    {
      label: "Nombre y Apellido",
      type: "text",
      id: "name",
    },
    {
      label: "Correo Electrónico",
      type: "email",
      id: "email",
    },
    {
      label: "Mensaje",
      type: "textarea",
      id: "message",
    },
  ]);
  const handleFields = (event) => {
    if (event.target.id === "name") {
      setName(event.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: null,
      }));
    } else if (event.target.id === "email") {
      setEmail(event.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: null,
      }));
    } else {
      setMessage(event.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: null,
      }));
    }
  };


  const validateFields = () => {
    const errors = {};
    
    if (!name) {
      errors.name = 'El nombre es obligatorio';
    }
    
    if (!email) {
      errors.email = 'El correo electrónico es obligatorio';
    }
    
    if (!message) {
      errors.message = 'El mensaje es obligatorio';
    }
    
    setErrors(errors);
    
    return Object.keys(errors).length === 0;
  };


  const sendDataCreate = () => {
  const isValid = validateFields();
  
  if (isValid) {
    axios.post('https://prueba.coderf5.es/api/contact', {
      name: name,
      email: email,
      message: message
    }, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
    .then((response) => {
      document.getElementById(`name`).value = ""
      document.getElementById(`email`).value = ""
      document.getElementById(`message`).value = ""
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
};


  // Enable/Disable button register on click checkbox terms
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section id="form-section" className="contactForm">
      <div className="container-form" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        <h2 className="title">Contáctanos</h2>
        <form className="mx-autoform formContact">
          {fields.map((field) => (
            <div key={field.id} className="mb-3-input form-control">
              <label></label>
              <InputsRegister key={field.id} {...field} handleOnChange={handleFields} />
              {errors[field.id] && <span className="errorForm">{errors[field.id]}</span>}
            </div>
          ))}
          <div className='checkbox'>
            <label>
              <input type="checkbox" id='termschkbx' onChange={handleCheckboxChange} />
              <p>Acepto los <a href="/terms" id="terminos"><strong>Términos y condiciones</strong></a></p>
            </label>
          </div>
          <p className="cookies">Después de acceder con éxito, se utiliza una cookie en su navegador para dar seguimiento a su sesión. Puede consultar nuestra <a href="/cookies">Politica de cookies </a> para más detalles.</p>
          <button id='btnContact' type="submit" onClick={sendDataCreate} className='btn btnContact' disabled={!isChecked}>Enviar</button>
        </form>


      </div>

    </section>
  );
};

ContactForm.propTypes = {};

export default ContactForm;