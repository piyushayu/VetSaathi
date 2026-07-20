import React, { useState, useEffect } from 'react';
import { updateProfile } from '@/lib/database';
import { uploadToSupabase } from '../../../utils/Filestore';
import { User } from 'lucide-react';

function SuccessToast({ visible }) {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2 px-5 py-3 bg-neutral-800 border border-neutral-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-neutral-950/30 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Profile updated
    </div>
  );
}

function EditProfile({ edit, cancelfunctn, onSaveSuccess, userId, currentProfile }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (edit && currentProfile) {
      setName(currentProfile.name || "");
      setLocation(currentProfile.location || "");
      setMemberSince(currentProfile.member_since || "");
      setAvatarUrl(currentProfile.avatar_url || "");
      setError(null);
    }
  }, [edit, currentProfile]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const publicUrl = await uploadToSupabase(file, "Images");
    setUploading(false);

    if (publicUrl) {
      setAvatarUrl(publicUrl);
    } else {
      setError("Failed to upload profile picture.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: updateError } = await updateProfile(userId, {
      name,
      location,
      memberSince,
      avatarUrl,
    });

    if (updateError) {
      setError("Failed to save changes. " + updateError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    if (onSaveSuccess) onSaveSuccess();
  };

  if (!edit && !showSuccess) return <SuccessToast visible={false} />;


  return (
    <>
      <SuccessToast visible={showSuccess} />

      {edit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 text-neutral-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold mb-6 text-neutral-200">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
             
              {/* Profile Photo Upload Section */}
              <div className="flex items-center gap-4 p-4 bg-neutral-950/40 border border-neutral-800/60 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-blue-900/50 border border-blue-700/30 flex items-center justify-center text-xl font-bold text-blue-400 select-none overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-sm font-medium text-neutral-200">Profile Picture</span>
                  <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 text-neutral-200 text-xs font-semibold px-4 py-2 rounded-lg transition active:scale-95 text-center select-none">
                    {uploading ? "Uploading..." : "Upload New Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="profile-name" className="text-sm font-medium text-neutral-200">
                  Full Name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition"
                  placeholder="e.g. Rajan Kumar"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="profile-location" className="text-sm font-medium text-neutral-200">
                  Location
                </label>
                <input
                  id="profile-location"
                  type="text"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition"
                  placeholder="e.g. Mumbai, MH"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="profile-member" className="text-sm font-medium text-neutral-200">
                  Member Since
                </label>
                <input
                  id="profile-member"
                  type="text"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition"
                  placeholder="e.g. June 2024"
                  value={memberSince}
                  onChange={(e) => setMemberSince(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={cancelfunctn}
                  className="px-5 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 font-medium hover:bg-neutral-800 hover:text-neutral-100 transition active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 border border-neutral-700 hover:border-neutral-600 text-white font-medium shadow-md shadow-neutral-700/10 transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
