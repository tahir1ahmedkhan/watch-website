import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const bucketName = process.env.SUPABASE_BUCKET_NAME || 'product-images';

let supabase: any = null;
let isSupabaseConfigured = false;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your-supabase-project-url') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    isSupabaseConfigured = true;
    console.log('✅ Supabase configured successfully');
  } catch (error) {
    console.warn('⚠️ Supabase initialization failed:', error);
  }
} else {
  console.warn('⚠️ Supabase not configured. Image upload will require URLs.');
}

export { supabase, isSupabaseConfigured };

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env file, or use image URLs instead.');
  }

  try {
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      throw new Error(`Supabase upload error: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured, skipping image deletion');
    return;
  }

  try {
    // Extract file path from URL
    const urlParts = imageUrl.split(`${bucketName}/`);
    if (urlParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      throw new Error(`Supabase delete error: ${error.message}`);
    }
  } catch (error) {
    console.error('Image delete error:', error);
    throw error;
  }
};

export default supabase;
