const express = require('express');
const queryString = require('node:querystring');
const axios = require("axios")
const router = express.Router();

// Define a route for the root URL
router.get('/', async (req, res) => {
  const uri = "https://accounts.spotify.com/authorize?client_id="+process.env.CLIENT_ID+"&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-top-read"
  res.send(
    `<a href=${uri}>Sign in</a>`
  )
});

router.get('/callback',async(req,res)=>{
  const spotifyResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    queryString.stringify({
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI_DECODED,
    }),
    {
      headers: {
        Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const accessToken = spotifyResponse.data.access_token
  res.cookie("token",accessToken,{httpOnly:true});
  res.status(201).send({accessToken});
})


// Your other routes and middleware can go here

module.exports = router;
