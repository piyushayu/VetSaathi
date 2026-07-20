import React, { useState, useEffect } from 'react'
import Profile from './Profile'
import EditProfile from './EditProfile'
import { getCurrentUser } from '@/lib/auth'
import { 
  getProfile, 
  getUserBookmarks, 
  getUserLikes, 
  getUserSearches,
  removeBookmark,
  removeLike,
  deleteSearch
} from '@/lib/database'

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
      if (bookmarksRes.data) {
        setBookmarks(bookmarksRes.data.map((e) => ({
          id: e.id,
          diseaseId: e.disease_id,
          name: e.diseases?.name || 'Unknown'
        })))
      }
      if (likesRes.data) {
        setLikes(likesRes.data.map((e) => ({
          id: e.id,
          diseaseId: e.disease_id,
          name: e.diseases?.name || 'Unknown'
        })))
      }
      if (searchesRes.data) {
        setSearches(searchesRes.data.map((e) => ({
          id: e.id,
          query: e.query
        })))
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  async function refreshProfile() {
    if (!userId) return
    const { data } = await getProfile(userId)
    if (data) setProfileData(data)
  }

  async function handleDeleteBookmark(diseaseId) {
    if (!userId) return
    const { error } = await removeBookmark(userId, diseaseId)
    if (!error) {
      setBookmarks((prev) => prev.filter((b) => b.diseaseId !== diseaseId))
    }
  }

  async function handleDeleteLike(diseaseId) {
    if (!userId) return
    const { error } = await removeLike(userId, diseaseId)
    if (!error) {
      setLikes((prev) => prev.filter((l) => l.diseaseId !== diseaseId))
    }
  }

  async function handleDeleteSearch(searchId) {
    const { error } = await deleteSearch(searchId)
    if (!error) {
      setSearches((prev) => prev.filter((s) => s.id !== searchId))
    }
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
    window.dispatchEvent(new Event('profile-updated'))
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
      <div className="w-full max-w-4xl mx-auto p-8 flex flex-col items-center gap-4 text-center">
        <p className="text-neutral-400">Please log in to view your profile.</p>
        <a href="/login" className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 rounded-xl text-sm font-medium transition-all">
          Go to Login
        </a>
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
        onDeleteBookmark={handleDeleteBookmark}
        onDeleteLike={handleDeleteLike}
        onDeleteSearch={handleDeleteSearch}
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