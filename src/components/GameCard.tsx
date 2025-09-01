import React from "react";
import { Popconfirm, message, Rate } from "antd";
import type { Post } from "../components/api";

interface GameCardProps {
  game: Post;
  favorites: number[];
  toggleFavorite: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  favorites,
  toggleFavorite,
  onEdit,
  onDelete,
}) => {
  const confirmDelete = () => {
    onDelete(game.id);
    message.success("Post deleted successfully.");
  };

  const cancelDelete = () => {
    message.error("Click on No");
  };

  return (
    <div className="relative bg-gray-800 p-3 rounded-lg shadow game_cards">
      <div className="card_wrapper">
        <div className="image_container">
          <img
            src={game.background_image}
            alt={game.name}
            className="rounded-md mb-2 w-full h-40 object-cover"
          />
        </div>
        <div className="game_info">
          <div>
            <h2 className="text-white text-lg font-semibold">{game.name}</h2>
            <p className="text-gray-400 text-sm">⭐ {game.rating}</p>
            <p className="text-gray-400 text-sm">
              🎥 {game.genres.map((item: any) => item?.name).join(", ")}
            </p>
          </div>

          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => toggleFavorite(game)}
              className="border-none cursor-pointer flex align-middle"
            >
              <>
                {favorites.includes(Number(game.id)) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-red-500"
                  fill="red"
                  viewBox="0 0 24 24"
                  style={{width: '24px', height: '24px'}}
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{width: '24px', height: '24px'}}

                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              )}
              </>
            </button>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this Game?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
              okText="Yes"
              cancelText="No"
            >
              <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                🗑️
              </button>
            </Popconfirm>

            <button
              onClick={() => onEdit(game)}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              ✏️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
