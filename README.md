#gifreply
### Flickr powered animated gifs for online conversations

!['Screenshot of gifreply'](http://i.imgur.com/7KR3LFA.png)

A simple express app that will fetch images from Flickr, let you search their tags and one click copy the url of the image.

Set Up:
In you bash profile file you will need to add two Flickr environment variables for the account of the images you want.
```
export FLICKR_API_KEY=<YOUR FLICKR API KEY>
export FLICKR_USER_ID=<YOUR FLICKR USER ID>
```
Get the code and install packages
```
git clone git@github.com:mkitzman/gifreply.git
cd gifreply && npm install
```

Start the app up
```
npm start
```

In browser got to http://localhost:3000/



