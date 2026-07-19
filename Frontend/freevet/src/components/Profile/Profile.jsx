import React from 'react';
import { Trash2 } from 'lucide-react';

function Profile({
  bookmarks = [],
  likes = [],
  searches = [],
  editfunctn,
  profileData,
  onDeleteBookmark,
  onDeleteLike,
  onDeleteSearch,
}) {
  const user = profileData || {};

  const initials = user.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-neutral-100 p-4">
      <div className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
        Profile
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name || 'User'}
              className="w-16 h-16 rounded-full object-cover border border-blue-700/30 select-none"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-900/50 border border-blue-700/30 flex items-center justify-center text-xl font-bold text-blue-400 select-none">
              {initials}
            </div>
          )}
          <div className="flex flex-col text-left">
            <h1 className="text-xl font-bold text-neutral-100">{user.name || 'User'}</h1>
            <p className="text-sm text-neutral-400">
              {user.member_since ? `Member since ${user.member_since}` : ''}
              {user.member_since && user.location ? ' · ' : ''}
              {user.location || ''}
            </p>
          </div>
        </div>
        
        <button
          onClick={editfunctn}
          className="flex items-center gap-2 px-4 py-2 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 text-sm font-medium rounded-xl transition active:scale-95 cursor-pointer"
        >
          <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit profile
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
       
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
            <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Bookmarks
          </div>
          <div className="text-2xl font-bold text-neutral-100">{bookmarks.length}</div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
            <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Likes given
          </div>
          <div className="text-2xl font-bold text-neutral-100">{likes.length}</div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
            <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Searches
          </div>
          <div className="text-2xl font-bold text-neutral-100">{searches.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-800 text-sm font-semibold text-neutral-300">
            <svg className="w-4 h-4 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Bookmarked diseases
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-60 pr-1 custom-scrollbar">
            {bookmarks.length > 0 ? (
              bookmarks.map((disease, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-neutral-800/60 border border-neutral-850 hover:bg-neutral-800 text-sm text-neutral-250 rounded-lg transition flex items-center justify-between group"
                >
                  <span>{disease.name}</span>
                  <button
                    onClick={() => onDeleteBookmark(disease.diseaseId)}
                    className="text-neutral-500 hover:text-red-500 p-1 rounded-md transition opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-xs text-neutral-500 italic py-2">No bookmarked diseases</div>
            )}
          </div>
        </div>

        <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-800 text-sm font-semibold text-neutral-300">
            <svg className="w-4 h-4 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Your likes
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-60 pr-1 custom-scrollbar">
            {likes.length > 0 ? (
              likes.map((like, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-neutral-800/60 border border-neutral-850 hover:bg-neutral-800 text-sm text-neutral-250 rounded-lg transition flex items-center justify-between group"
                >
                  <span>{like.name}</span>
                  <button
                    onClick={() => onDeleteLike(like.diseaseId)}
                    className="text-neutral-500 hover:text-red-500 p-1 rounded-md transition opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-xs text-neutral-500 italic py-2">No likes yet</div>
            )}
          </div>
        </div>

        <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-800 text-sm font-semibold text-neutral-300">
            <svg className="w-4 h-4 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search history
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-60 pr-1 custom-scrollbar">
            {searches.length > 0 ? (
              searches.map((search, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-neutral-800/60 border border-neutral-850 hover:bg-neutral-800 text-sm text-neutral-250 rounded-lg transition flex items-center justify-between group"
                >
                  <span>{search.query}</span>
                  <button
                    onClick={() => onDeleteSearch(search.id)}
                    className="text-neutral-500 hover:text-red-500 p-1 rounded-md transition opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-xs text-neutral-500 italic py-2">No searches yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;