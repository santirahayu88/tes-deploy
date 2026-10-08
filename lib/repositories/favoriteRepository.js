import { createClient } from "@/lib/supabase/server";

export async function findAllFavorites() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .insert(payload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFavoriteById(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("favorites").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}