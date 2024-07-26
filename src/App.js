import React, { useState } from 'react'
import ContractDetails from './components/ContractDetails'
import UnpaidJobsList from './components/UnpaidJobsList'
import { ProfileProvider } from './contexts/ProfileContext'
import ProfileInfo from './components/ProfileInfo'

function App() {
  const [profileId, setProfileId] = useState('')
  const [searchedProfileId, setSearchedProfileId] = useState('')

  const handleProfileIdChange = (event) => {
    setProfileId(event.target.value)
  }

  const handleSearch = () => {
    setSearchedProfileId(profileId)
  }

  return (
    <div>
      <p>Enter your profile ID:</p>
      <input
        type='text'
        placeholder='Profile ID'
        value={profileId}
        onChange={handleProfileIdChange}
      />
      <button onClick={handleSearch}>Search</button>
      <ProfileProvider profileId={searchedProfileId}>
        <ProfileInfo />
        <ContractDetails />
        <UnpaidJobsList />
      </ProfileProvider>
    </div>
  )
}

export default App
