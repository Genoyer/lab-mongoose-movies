const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celeb.js');
const Movie = require('../models/movie.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrity/celebs', { celebrities })
    })
    .catch((error) => {
      console.log(error)
    })
});

router.get('/celebrity/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findOne({'_id': celebrityId})
    .then((celebrity) => {
      res.render('celebrity/celeb-details', { celebrity })
    })
    .catch((error) => {
      console.log(error)
    })
});

router.get('/celebrities/add', (req, res, next) => {
  res.render('celebrity/celeb-add')
});

router.post('/celebrities/add', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity ({ name, occupation, catchPhrase });
    newCelebrity.save()
      .then((celebrity) => {
        res.redirect('/celebrities')
      })
      .catch((error) => {
        console.log(error)
      })
});

router.get('/celebrities/edit', (req, res, next) => {
  Celebrity.findOne({_id: req.query.celebrity_id})
    .then((celebrity) => {
      res.render('celebrity/celeb-edit', {celebrity})
    })
    .catch((error) => {
      console.log(error)
    })
});

router.post('/celebrities/edit', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.update({_id: req.query.celebrity_id}, { $set: {name, occupation, catchPhrase }}, { new: true })
    .then((celebrity) => {
      res.redirect('/celebrities')
    })
    .catch((error) => {
      console.log(error)
    })
})

router.post('/celebrity/delete/:id', (req, res, next) => {
  let celebId = req.params.id;
  Celebrity.findOneAndRemove({'_id': req.params.id})
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/movies', { movies })
    })
    .catch((error) => {
      console.log(error)
    })
});

router.get('/movies/:id', (req, res, next) => {
  let movieId = req.params.id;
  Movie.findOne({'_id': movieId})
    .then((movie) => {
      res.render('movies/movie-details', { movie })
    })
    .catch((error) => {
      console.log(error)
    })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movies/movie-add')
});

router.post('/movie/add', (req, res, next) => {
  const { title, genre, plot } = req.body;
  const newMovie = new Movie ({ title, genre, plot })
  newMovie.save()
    .then((movie) => {
      res.redirect('/movies')
    })
    .catch((error) => {
      console.log(error)
    })
});

router.get('/movie/edit', (req, res, next) => {
  Movie.findOne({_id: req.query.movie_id})
    .then((movie) => {
      res.render('movies/movie-edit', { movie })
    })
    .catch((error) => {
      console.log(error)
    })
});

router.post('/movie/edit', (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.update({_id: req.query.movie_id}, { $set:{ title, genre, plot}}, { new: true })
  .then((movie) => {
    res.redirect('/movies')
  })
  .catch((error) => {
    console.log(error)
  })
})

module.exports = router;
