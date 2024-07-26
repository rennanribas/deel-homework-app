import React, { useContext } from 'react'
import ProfileContext from '../contexts/ProfileContext'

const ProfileInfo = () => {
  const { profile, isLoading, error } = useContext(ProfileContext)

  if (isLoading) return <p>Loading profile...</p>
  if (error) return <p>Error: {error.response.data.error || 'Unknown error'}</p>

  if (profile)
    return (
      <div>
        <h2>Profile Info</h2>
        <p>Name: {profile?.firstName}</p>
        <p>Profession: {profile?.profession}</p>
        <p>Balance: {profile?.balance}</p>
        <p>Type: {profile?.type}</p>
      </div>
    )
}

export default ProfileInfo
