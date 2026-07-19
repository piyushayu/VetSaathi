
import { supabase } from './supabase'

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}

export async function createProfile(userId, profileData) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      name: profileData.name || '',
      location: profileData.location || '',
      member_since: profileData.memberSince || '',
    })
    .select()
    .single()

  return { data, error }
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      name: updates.name,
      location: updates.location,
      member_since: updates.memberSince,
      avatar_url: updates.avatarUrl,
    })
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

export async function getAllAnimals() {
  const { data, error } = await supabase
    .from('animals')
    .select('*')
    .order('name')

  return { data, error }
}

export async function getAnimalByName(name) {
  const { data, error } = await supabase
    .from('animals')
    .select('*')
    .ilike('name', name)
    .single()

  return { data, error }
}

export async function getDiseasesByAnimal(animalName) {
  const { data, error } = await supabase
    .from('diseases')
    .select(`
      *,
      animals!inner ( name )
    `)
    .ilike('animals.name', animalName)

  return { data, error }
}

export async function getDiseasesWithSymptomsByAnimal(animalName) {
  const { data, error } = await supabase
    .from('diseases')
    .select(`
      id, name, context,
      symptoms,
      animals!inner ( name )
    `)
    .ilike('animals.name', animalName)

  return { data, error }
}

export async function getDiseaseByName(diseaseName, animalName) {
  let query = supabase
    .from('diseases')
    .select(`
      *,
      medicines ( * ),
      animals!inner ( name )
    `)
    .ilike('name', diseaseName)

  if (animalName) {
    query = query.ilike('animals.name', animalName)
  }

  const { data, error } = await query.single()

  return { data, error }
}

//
export async function searchDiseases(query) {
  const { data, error } = await supabase
    .from('diseases')
    .select(`
      *,
      animals ( name )
    `)
    .ilike('name', `%${query}%`)

  return { data, error }
}
//

export async function storequery(query) {
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('searches')
    .insert({
      user_id: user?.id || null,
      query: query
    })

  return { error }
}



export async function addBookmark(userId, diseaseId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ user_id: userId, disease_id: diseaseId })
    .select()

  return { data, error }
}

export async function removeBookmark(userId, diseaseId) {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('disease_id', diseaseId)

  return { error }
}

export async function getUserBookmarks(userId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      *,
      diseases ( id, name )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function addLike(userId, diseaseId) {
  const { data, error } = await supabase
    .from('likes')
    .insert({ user_id: userId, disease_id: diseaseId })
    .select()

  return { data, error }
}

export async function removeLike(userId, diseaseId) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('disease_id', diseaseId)

  return { error }
}

export async function getUserLikes(userId) {
  const { data, error } = await supabase
    .from('likes')
    .select(`
      *,
      diseases ( id, name )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function saveSearch(userId, query) {
  const { data, error } = await supabase
    .from('searches')
    .insert({ user_id: userId, query })
    .select()

  return { data, error }
}

export async function getUserSearches(userId) {
  const { data, error } = await supabase
    .from('searches')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function clearSearchHistory(userId) {
  const { error } = await supabase
    .from('searches')
    .delete()
    .eq('user_id', userId)

  return { error }
}

export async function deleteSearch(searchId) {
  const { error } = await supabase
    .from('searches')
    .delete()
    .eq('id', searchId)

  return { error }
}



export async function submitFeedback({ name, email, feedbackType, message, userId }) {
  const { error } = await supabase
    .from('feedback')
    .insert({
      user_id: userId || null,
      name: name || '',
      email: email || '',
      feedback_type: feedbackType || 'Feature',
      message,
    })

  return { error }
}

export async function getSymptomQuestions() {
  const { data, error } = await supabase
    .from('symptom_questions')
    .select(`
      *,
      symptom_options ( * )
    `)
    .order('order_index')

  return { data, error }
}

export async function getfeedbackoptions(){
  const {data , error } = await supabase
  .from('Feedbackoptions')
  .select('*')
  .order('created_at' , {ascending : false})

  return {data ,error}
}