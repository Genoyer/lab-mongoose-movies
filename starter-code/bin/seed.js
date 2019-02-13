const mongoose = require('mongoose');
const Celebrity = require('../models/celeb');
const Movie = require('../models/movie');

const dbName = "mongoose-movies";
mongoose.connect(`mongodb://localhost/${dbName}`);

// const celebrities = [
//   {
//     name: "Tom Cruise",
//     occupation: "Actor",
//     catchPhrase: "AMerican Made"
//   },
//   {
//     name: "George Clooney",
//     occupation: "Actor",
//     catchPhrase: "None"
//   },
//   {
//     name: "Michael Jordan",
//     occupation: "Actor",
//     catchPhrase: "GO BULLS!"
//   }
// ];

// Celebrity.create(celebrities, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${celebrities.length} celebrities`)
//   mongoose.connection.close()
// });

const movies = [
  {
    title: "Space Jam",
    genre: "Cartoon",
    plot: "oihfowiejgowjgpwo" 
  },
  {
    title: "Forrest Gump",
    genre: "Drama",
    plot: "pajspcojewpfowkgp"
  },
  {
    title: "Tropic Thunder",
    genre: "Comedy",
    plot: "oijfdqpwojfpewjgpwoejg"
  }
];

Movie.create(movies, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${movies.length} movies`)
  mongoose.connection.close()
});