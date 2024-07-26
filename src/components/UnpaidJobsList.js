import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import ProfileContext from '../contexts/ProfileContext'

const UnpaidJobsList = () => {
  const { profile } = useContext(ProfileContext)
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:3000/jobs/unpaid`, {
          headers: {
            profile_id: profile?.id,
          },
        })
        setJobs(response.data.result)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (profile) {
      fetchJobs()
    }
  }, [profile])

  const handlePayJob = async (jobId) => {
    try {
      await axios.post(`http://localhost:3000/jobs/${jobId}/pay`, null, {
        headers: {
          profile_id: profile?.id,
        },
      })
      const updatedJobs = jobs.filter((job) => job.id !== jobId)
      setJobs(updatedJobs)
    } catch (error) {
      console.error('Error paying job:', error)
    }
  }

  if (isLoading) {
    return <p>Loading unpaid jobs...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  if (!jobs.length && profile) {
    return <p>You don't have any unpaid jobs.</p>
  }
  if (profile)
    return (
      <div>
        <h2>Unpaid Jobs</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              Description: {job.description} - Price: ${job.price} - Contract
              ID:
              {' ' + job.ContractId}
              {'   '}
              <button onClick={() => handlePayJob(job.id)}>Pay Now</button>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default UnpaidJobsList
