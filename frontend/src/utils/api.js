// Centralized API endpoint helper for Jikan
export const getEndpoint = (type) => {
  switch (type) {
    case "top":
      return "https://api.jikan.moe/v4/top/anime";
    case "season":
      return "https://api.jikan.moe/v4/seasons/now";
    case "upcoming":
      return "https://api.jikan.moe/v4/seasons/upcoming";
    case "anime": // fallback for a single anime if needed
    default:
      return "https://api.jikan.moe/v4/top/anime";
  }
};
