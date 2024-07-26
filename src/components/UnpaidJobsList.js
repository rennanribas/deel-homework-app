import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UnpaidJobsList = ({ profileId }) => {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:3000/jobs/unpaid`, {
          headers: {
            profile_id: profileId,
          },
        })
        setJobs(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (profileId) {
      fetchJobs()
    }
  }, [profileId])

  if (isLoading) {
    return <p>Carregando lista de trabalhos não pagos...</p>
  }

  if (error) {
    return <p>Erro: {error.message}</p>
  }

  if (!jobs.length) {
    return <p>Não há trabalhos não pagos.</p>
  }

  // Exibir a lista de trabalhos não pagos (adaptar de acordo com a estrutura do seu JSON)
  return (
    <div>
      <h2>Trabalhos Não Pagos</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - Cliente: {job.clientName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UnpaidJobsList
