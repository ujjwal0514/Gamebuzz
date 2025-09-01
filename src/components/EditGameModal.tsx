import React, { useState, useEffect } from "react";
import { Modal, Input, Rate } from "antd";
import type { Post } from "../components/api";

interface EditGameModalProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onUpdate: (id: string, data: Partial<Post>) => void;
}

const EditGameModal: React.FC<EditGameModalProps> = ({
  open,
  onClose,
  post,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.name);
      setRating(post.rating);
      setGenre(post.genres?.[0]?.name || "");
    }
  }, [post]);

  const handleOk = () => {
    if (post) {
      onUpdate(post.id, {
        name: title,
        rating,
        genres: genre.trim()
          ? [
              {
                id: 1,
                name: genre.trim(),
                slug: genre.trim().toLowerCase(),
                games_count: 0,
                image_background: "",
              },
            ]
          : post.genres,
      });
    }
    onClose();
  };

  return (
    <Modal title="Edit Game" open={open} onOk={handleOk} onCancel={onClose} okText="Update">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Name</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Rating</label>
          <Rate allowHalf count={5} value={rating} onChange={(value) => setRating(value)} />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Genre</label>
          <Input value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
};

export default EditGameModal;
