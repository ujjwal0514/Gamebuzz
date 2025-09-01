import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { addPost, deletePost, fetchPosts, updatePost } from "../postSlice";
import type { Post } from "./api";
import { Button } from "antd";

import GameCard from "./GameCard";
import EditGameModal from "./EditGameModal";
import AddGameModal from "./AddGameModal";

const GameList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredPosts = useSelector((state: RootState) =>
    [...state.posts.filteredPosts].sort(
      (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
    )
  );

  const [favorites, setFavorites] = useState<number[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  const toggleFavorite = (post: Post) => {
    let updatedFavs: number[] = [];
    let storedPosts: Post[] = JSON.parse(
      localStorage.getItem("favoritePosts") || "[]"
    );
    if (favorites.includes(Number(post.id))) {
      // remove from fav
      updatedFavs = favorites.filter((id) => id !== Number(post.id));
      storedPosts = storedPosts.filter((p) => p.id !== post.id);
    } else {
      // add to fav
      updatedFavs = [...favorites, Number(post.id)];
      storedPosts = [...storedPosts, post];
    }
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    localStorage.setItem("favoritePosts", JSON.stringify(storedPosts));
  };

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setIsEditOpen(true);
  };

  const handleUpdate = (id: any, data: Partial<Post>) => {
    if (!currentPost) return;

    const updatedPost: Post = {
      ...currentPost, // take all existing fields
      ...data, // overwrite updated fields
      slug: data.slug ?? currentPost.slug, // ensure slug is always defined
    };

    dispatch(updatePost({ id, updated: updatedPost }));
  };

  const handleDelete = (id: any) => {
    dispatch(deletePost(id));
  };

  const handleAdd = (post: Post) => {
    dispatch(addPost(post));
  };

  return (
    <>
      <div className="flex items-center justify-between" style={{paddingBlock: '14px', paddingInline: '14px'}}>
        <h2>Game Buzz</h2>
        <Button type="primary" onClick={() => setIsAddOpen(true)}>
          Add Game
        </Button>
      </div>

      <div className="game_card_row grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-400">No results found</p>
        )}
      </div>

      <EditGameModal
        open={isEditOpen}
        post={currentPost}
        onClose={() => setIsEditOpen(false)}
        onUpdate={handleUpdate}
      />

      <AddGameModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAdd}
      />
    </>
  );
};

export default GameList;
