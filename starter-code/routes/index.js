const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celeb.js');

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
  Celebrity.update({_id: req.quert.celebrity_id}, { $set: {name, occupation, catchPhrase }}, { new: true })
    .then((celebrity) => {
      res.redirect('celebrity/celebs')
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router;
