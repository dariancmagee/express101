const express = require('express');
const app = express();
const port = 3000;
const friendsArray = require('./db');

console.log(friendsArray);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/friends', (req, res) => {
   let htmlData = `<ul>`;
   for (let friend of friendsArray) {
       htmlData += `<li>
       <a href='/friends/${friend.handle}'>${friend.name}</a></li>`
   }
   htmlData += `</ul>`

   res.send(htmlData);
});

app.get('/friends/:handle', (req, res) => {
    const {handle} = req.params;
    console.log('Handle is', handle);
    const friend = friendsArray.find(friend => friend.handle === handle);
    console.log(friend);

    if (friend) {
    let htmlData = ``;
    htmlData += `<h1>${friend.name}</h1>`;
    htmlData += `<h2>${friend.handle}</h2>`;
    res.send(htmlData);
    } else {
        res.status(404)
            .send(`No freind with handle ${handle}`)
    }
});

app.post('/user', (req, res) => {
    res.send('Got a POST request at /user')
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});