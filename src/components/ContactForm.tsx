"use client"

import { useState } from 'react';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [celphone, setCelphone] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [name, setName] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && celphone && mensaje && name) {
      const contenidoCorreo = `mailto:abl3ew3@gmail.com?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(`Mensaje: ${mensaje}%0D%0ANúmero de Celular: ${celphone}%0D%0ADirección de Correo: ${email}`)}`;
      window.location.href = contenidoCorreo;
      setEnviado(true);
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  return (
    <section className='py-20 md:w-[80%] mx-auto'>
      <h2 className='text-4xl mb-20'>¿En qué te podemos ayudar?</h2>
      <div className='flex flex-col md:flex-row justify-center px-8 gap-10' id='contact'>
        <div className='w-full md:w-[50%] text-left leading-loose text-xl md:mb-10 md:mb-0'>
          <p>
            Gracias por tu interes, déjanos tu mensaje estaremos respondiendo lo antes posible.
            Nuestro horario de atención es de <strong>8:00 a.m. - 5:00 p.m.</strong>
          </p>
          <p className='mt-10'><strong>Teléfono:</strong> 3335705813</p>
          <p><strong>Correo:</strong> francescahdez@gmail.com</p>
        </div>
        
        <form onSubmit={handleEnviar} className='w-full md:w-[50%] flex flex-col'>
          <div className='mb-2.5'>
            <input 
              name='name' 
              type='text' 
              placeholder='Nombre' 
              onChange={(e) => setName(e.target.value)}
              disabled={enviado} 
              required
              className='w-full outline-none border-2 border-transparent bg-[#ccc] text-[#666666] text-sm p-1 font-sans font-medium'
            />
          </div>
          <div className='mb-2.5'>
            <input 
              name='e-mail' 
              type='email' 
              placeholder='E-mail' 
              onChange={(e) => setEmail(e.target.value)}
              disabled={enviado} 
              required
              className='w-full outline-none border-2 border-transparent bg-[#ccc] text-[#666666] text-sm p-1 font-sans font-medium'
            />
          </div>
          <div className='mb-2.5'>
            <input 
              name='celphone' 
              type="tel" 
              placeholder='Teléfono' 
              onChange={(e) => setCelphone(e.target.value)}
              disabled={enviado} 
              required
              className='w-full outline-none border-2 border-transparent bg-[#ccc] text-[#666666] text-sm p-1 font-sans font-medium'
            />
          </div>
          <div className='mb-2.5'>
            <textarea 
              name='message' 
              id='message' 
              placeholder='Mensaje' 
              onChange={(e) => setMensaje(e.target.value)}
              disabled={enviado} 
              required
              className='w-full outline-none border-2 border-transparent bg-[#ccc] text-[#666666] text-sm p-1 font-sans font-medium h-[100px] resize-none'
            ></textarea>
          </div>
          <button 
            type='submit' 
            disabled={enviado}
            className='bg-black text-white mt-2.5 self-end rounded-md px-4 py-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
          >
            ENVIAR
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm; 