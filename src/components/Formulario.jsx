import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes , paciente, setPaciente}) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])
  

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay al menos un campo vacio");
      setError(true);
      return;
    } 

      setError(false);

      // Objeto de Paciente
      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas
      };

      if (paciente.id) {
        // Editando el registro
        objetoPaciente.id = paciente.id

        // Guardaré en pacientesActualizados el resultado de una validación, pacientes.map es el listado de pacientes, genero pacienteState para comparar el id que tengo en el State con el id del paciente que quiero editar, si son iguales los id, pacientesActualizados = objetoPaciente.
        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        // Se limpia el State
        setPaciente({})
      } else {
        // Nuevo registro
        objetoPaciente.id = generarId();
        setPacientes([...pacientes, objetoPaciente]);
      }
      
    
      // Reiniciar el form
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')

      //    console.log('Enviando formulario');
  };
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 mb-10 text-center">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error>
            <p>Todos los campos son obligatorios.</p>
          </Error>
        )}

        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-slate-900 rounded-md"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-slate-900 rounded-md"
            value={propietario}
            onChange={(event) => setPropietario(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 mt-2 placeholder-slate-900 rounded-md"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>

          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-slate-900 rounded-md"
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>

          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-slate-900 rounded-md"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={(event) => setSintomas(event.target.value)}
          ></textarea>
        </div>

        <input
          type="submit"
          value={paciente.id ? "Editar paciente" : "Agregar paciente"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Formulario;
