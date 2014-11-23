module.exports = {
    "api_key": process.env.FLICKR_API_KEY,
    "extras": "url_o,url_q,tags",
    "page": 1,
    "per_page": 500,
    "user_id": process.env.FLICKR_USER_ID,
};