import React, { useState, useEffect } from 'react'
import Profile from './Profile'
import EditProfile from './EditProfile'
import { getCurrentUser } from '@/lib/auth'
import { getProfile, getUserBookmarks, getUserLikes, getUserSearches } from '@/lib/database'

function Profilecomp() {
  const [isedit, setIsedit] = useState(false)

  const [profileData, setProfileData] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [likes, setLikes] = useState([])
  const [searches, setSearches] = useState([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)

      const { user } = await getCurrentUser()
      if (!user) {
        setLoading(false)
        return
      }

      setUserId(user.id)

      const [profileRes, bookmarksRes, likesRes, searchesRes] = await Promise.all([
        getProfile(user.id),
        getUserBookmarks(user.id),
        getUserLikes(user.id),
        getUserSearches(user.id),
      ])

      if (profileRes.data) setProfileData(profileRes.data)
      if (bookmarksRes.data) setBookmarks(bookmarksRes.data.map((b) => b.diseases?.name || 'Unknown'))
      if (likesRes.data) setLikes(likesRes.data.map((l) => l.diseases?.name || 'Unknown'))
      if (searchesRes.data) setSearches(searchesRes.data.map((s) => s.query))

      setLoading(false)
    }

    loadProfile()
  }, [])

  async function refreshProfile() {
    if (!userId) return
    const { data } = await getProfile(userId)
    if (data) setProfileData(data)
  }

  function onEditClick() {
    setIsedit(true)
  }

  function onCancelClick() {
    setIsedit(false)
  }

  async function onSaveSuccess() {
    setIsedit(false)
    await refreshProfile()
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center text-neutral-400">
        Loading profile...
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center text-neutral-400">
        Please log in to view your profile.
      </div>
    )
  }

  return (
    <div>
      <Profile
        editfunctn={onEditClick}
        profileData={profileData}
        bookmarks={bookmarks}
        likes={likes}
        searches={searches}
      />
      <EditProfile
        edit={isedit}
        cancelfunctn={onCancelClick}
        onSaveSuccess={onSaveSuccess}
        userId={userId}
        currentProfile={profileData}
      />
    </div>
  )
}

export default Profilecomp