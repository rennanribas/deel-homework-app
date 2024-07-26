import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const ProfileContext = createContext()

export const ProfileProvider = ({ children, profileId }) => {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            profile_id: profileId,
          },
        })
        setProfile(response.data.result)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (profileId) {
      fetchProfile()
    }
  }, [profileId])

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
