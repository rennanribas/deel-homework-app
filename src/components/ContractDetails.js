import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import ProfileContext from '../contexts/ProfileContext'

const ContractDetails = () => {
  const { profile } = useContext(ProfileContext)
  const [contractData, setContractData] = useState(null)
  const [searchContractId, setSearchContractId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setContractData(null)
    if (searchContractId && profile) {
      setError(null)
      setIsLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:3000/contracts/${searchContractId}`,
          {
            headers: {
              profile_id: profile?.id,
            },
          }
        )
        setContractData(response.data.result)
      } catch (error) {
        console.log(error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!isLoading && profile) {
    return (
      <div>
        <h2>Contract Details</h2>
        <div>
          <p>Enter a contract ID to view details:</p>
          <input
            type='text'
            placeholder='Contract Id'
            value={searchContractId}
            onChange={(e) => setSearchContractId(e.target.value)}
          />
          <button onClick={fetchData}>Search</button>
          {error && <p>Error: {error.response.data.error}</p>}
        </div>

        {contractData && (
          <div>
            <p>ID: {contractData?.id}</p>
            <p>Terms: {contractData.terms}</p>
            <p>Status: {contractData.status}</p>
            <p>Contractor: {contractData.ContractorId}</p>
            <p>
              Created At:{' '}
              {new Date(contractData.createdAt).toLocaleDateString()}
            </p>
            <p>
              Updated At:{' '}
              {new Date(contractData.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    )
  }
}

export default ContractDetails
