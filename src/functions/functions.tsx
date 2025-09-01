import { useSelector } from "react-redux";
import type { RootState } from "../store"; // adjust path
import type { Post } from "../components/api"; // your Post type

export function useFetchPosts() {
  // ✅ Directly read posts + loading from Redux store
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  return { posts, loading };
}
