import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ContractDetails = ({ contractId, profileId }) => {
  const [contractData, setContractData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:3000/contracts/${contractId}`,
          {
            headers: {
              profile_id: profileId,
            },
          }
        )
        setContractData(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (contractId && profileId) {
      fetchData()
    }
  }, [contractId, profileId])

  if (isLoading) {
    return <p>Carregando detalhes do contrato...</p>
  }

  if (error) {
    return <p>Erro: {error.message}</p>
  }

  if (!contractData) {
    return <p>Contrato não encontrado.</p>
  }

  return (
    <div>
      <h2>Detalhes do Contrato</h2>
      <p>ID: {contractData.id}</p>
      <p>Cliente: {contractData.clientName}</p>
      {/* ... outros detalhes do contrato ... */}
    </div>
  )
}

export default ContractDetails
