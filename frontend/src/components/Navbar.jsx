import { HelpCircle, LogOut, Search, Settings, X } from "lucide-react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTgzMDFlZGQ2MGEzN2Y3NDlmMzhlNGFmMTJjZDE3YSIsIm5iZiI6MTc0NTQxNjIyNS44NzY5OTk5LCJzdWIiOiI2ODA4ZjAyMTI3NmJmNjRlNDFhYjY0ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NA_LMt6-MUBLAvxMRkZtBoUif4p9YQ6aYZo-lv4-PUE",
  },
};

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&include_adult=false&language=en-US&page=1`,
          TMDB_OPTIONS
        );
        const data = await res.json();
        setSearchResults(data.results ? data.results.slice(0, 7) : []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  const handleSelectMovie = (id) => {
    setQuery("");
    setSearchResults([]);
    navigate(`/movie/${id}`);
  };

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap relative z-50">
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Logo"
          className="w-24 cursor-pointer brightness-125"
        />
      </Link>

      <ul className="hidden xl:flex space-x-6">
        <li className="cursor-pointer hover:text-[#e50914]"><Link to="/">Home</Link></li>
        <li className="cursor-pointer hover:text-[#e50914]"><Link to="/ai-recommendations">AI Recommendations</Link></li>
      </ul>

      <div className="flex items-center space-x-4 relative" ref={searchRef}>
        <div className="relative hidden md:inline-flex flex-col">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none text-white focus:ring-2 focus:ring-[#e50914]"
              placeholder="Search movies..."
            />
            {query ? (
              <X
                onClick={() => setQuery("")}
                className="absolute right-4 w-4 h-4 text-gray-400 cursor-pointer hover:text-white"
              />
            ) : (
              <Search className="absolute right-4 w-5 h-5 text-gray-400" />
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-[#181818] border border-[#333] rounded-lg shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
              {searchResults.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelectMovie(m.id)}
                  className="flex items-center gap-3 p-3 hover:bg-[#282828] cursor-pointer border-b border-[#282828] transition"
                >
                  {m.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${m.poster_path}`}
                      alt={m.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-gray-800 rounded flex items-center justify-center text-xs">
                      No Img
                    </div>
                  )}
                  <div className="flex flex-col text-left truncate">
                    <span className="text-white text-sm font-semibold truncate">
                      {m.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {m.release_date ? m.release_date.slice(0, 4) : "N/A"} • ⭐{" "}
                      {m.vote_average?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link to={user ? "/ai-recommendations" : "/signin"}>
          <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer rounded hover:bg-[#b0060f] transition">
            Get AI Movie Picks
          </button>
        </Link>

        {!user ? (
          <Link to={"/signin"}>
            <button className="border border-[#333333] py-2 px-4 cursor-pointer rounded hover:bg-[#222]">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="text-white relative">
            <img
              src={avatarUrl}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>

                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <HelpCircle className="w-5 h-5" />
                  Help Center
                </button>

                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

