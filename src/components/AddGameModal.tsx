import React from "react";
import { Modal, Form, Input, Rate } from "antd";
import type { Post } from "../components/api";

interface AddGameModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (post: Post) => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ open, onClose, onAdd }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newPost: Post = {
        id: Math.floor(1000 + Math.random() * 9000).toString(),
        name: values.name,
        background_image: values.image,
        genres: [
          {
            id: 1,
            name: values.genre,
            slug: values.genre.toLowerCase(),
            games_count: 0,
            image_background: "",
          },
        ],
        rating: values.rating,
        slug: values.name.toLowerCase().replace(/\s+/g, "-"),
        released: new Date().toISOString(),
        tba: false,
        rating_top: 5,
        ratings: [],
        ratings_count: 0,
        reviews_text_count: 0,
        added: 0,
        added_by_status: {
          yet: 0,
          owned: 0,
          beaten: 0,
          toplay: 0,
          dropped: 0,
          playing: 0,
        },
        metacritic: 0,
        playtime: 0,
        suggestions_count: 0,
        updated: new Date().toISOString(),
        user_game: null,
        reviews_count: 0,
        saturated_color: "",
        dominant_color: "",
        platforms: [],
        parent_platforms: [],
        stores: [],
        clip: null,
        tags: [],
        esrb_rating: { id: 0, name: "", slug: "" },
        short_screenshots: [],
        createdAt: Date.now(),
      };
      onAdd(newPost);
      form.resetFields();
      onClose();
    } catch (err) {
      console.error("Validation Failed:", err);
    }
  };

  return (
    <Modal title="Add New Game" open={open} onOk={handleOk} onCancel={onClose} okText="Add">
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Game Name" rules={[{ required: true, message: "Please enter game name" }]}>
          <Input placeholder="Enter game name" />
        </Form.Item>
        <Form.Item name="image" label="Image URL" rules={[{ required: true, message: "Please enter image URL" }]}>
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item name="genre" label="Genre" rules={[{ required: true, message: "Please enter genre" }]}>
          <Input placeholder="Enter genre" />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ required: true, message: "Please give a rating" }]}>
          <Rate allowHalf allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGameModal;
