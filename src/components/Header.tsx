import { useState, useEffect } from "react";
import type{ Post } from "../components/api"; // adjust path
import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import { filterPosts } from "../postSlice";

const Header = () => {
  const [favorites, setFavorites] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Load favorite posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem("favoritePosts");
    if (storedPosts) {
      setFavorites(JSON.parse(storedPosts));
    }
  }, [open]); // refresh when drawer opens

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterPosts(e.target.value));
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-gray-900 shadow-md main_header">
      {/* Logo */}
      <div className="flex items-center header_logo">
        <img
          width="55"
          height="50"
          src="/game_buzz_logo.png"
          alt="Movie buzz logo"
          className="object-contain"
        />
      </div>

      {/* Search Box */}
      <div className="flex-1 mx-6 search_box">
        <input
          type="text"
          placeholder="Search for games..."
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-lg text-white placeholder-gray-400 focus:outline-none bg-gray-800"
        />
      </div>

      {/* Favourite Button */}
      <div className="flex items-center fav_button">
        <button
          onClick={() =>{
             showDrawer()
          }}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          <span>Favourites</span>
        </button>
      </div>

      <Drawer
        title="Favourite List"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {favorites?.length > 0 ? (
            favorites.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center bg-gray-800 p-2 rounded-lg"
                style={{ marginBottom: "12px" }}
              >
                <img
                  src={fav.background_image}
                  alt={fav.name}
                  className="rounded object-cover"
                  style={{ width: "60px", height: "80px" }}
                />
                <div className="ml-3" style={{marginLeft: '12px'}}>
                  <h3 className="text-white font-medium truncate" style={{width: '250px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} title={fav.name}>
                    {fav.name}
                  </h3>
                  <p className="text-gray-400 text-sm">⭐ {fav.rating}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No favourites yet.</p>
          )}
        </div>
      </Drawer>

    </header>
  );
};

export default Header;
