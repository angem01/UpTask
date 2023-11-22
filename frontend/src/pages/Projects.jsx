import useProjects from "../hooks/useProjects"
import { useEffect } from "react"
import PreviewProject from "../components/PreviewProject"
import Alert from "../components/Alert"
import io from 'socket.io-client'

let socket; 

const Projects = () => {

  const { projects, alert } = useProjects()

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('prueba', 'Ange')

    socket.on('respuesta', (person) => {
      console.log('Desde el frontend', person)
    })
  })

  const { msg } = alert

  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>

      {msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? 
          projects.map(project => (
            <PreviewProject
              key={project._id}
              project={project}
            />
          ))
        : <p className=" text-center text-gray-600 uppercase p-5">No hay proyectos</p>}
      </div>
    </>
  )
}

export default Projects
