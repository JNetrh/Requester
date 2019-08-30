[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)

# Requester
Sending request to a given URL adresses. Adresses are read from file with default na 'urls.txt' or argument with a path can be provided.
Data from response are processed acording to theirs structure and written to a new file.

###prerequisities

- Node v 10.15.3 or higher
- npm 6.4.1 or higher


### how to run
First install dependecies
```
$ npm install
```

Once you have your URLs list in ./urls.txt

```
$ node index.js
```

If there is a different name or path to the file you can provide it as a argv
```
$node index.js ./path/to/the/file.txt
```
