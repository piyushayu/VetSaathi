import { supabase } from "../src/lib/supabase"

const uploadToSupabase = async (file, bucketName = "images") => {
    try {
        if (!file) return null

        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.${fileExt}`

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            throw error
        }
        const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName)

        return publicUrl

    } catch (error) {
        console.error("Supabase upload error:", error.message)
        return null
    }
}

const deleteFromSupabase = async (filePath, bucketName = "images") => {
    try {
        if (!filePath) return false

        const { data, error } = await supabase.storage
            .from(bucketName)
            .remove([filePath])

        if (error) {
            throw error
        }

        return true

    } catch (error) {
        console.error("Supabase delete error:", error.message)
        return false
    }
}

export { uploadToSupabase, deleteFromSupabase }
