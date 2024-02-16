const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65a152b33a1010ffa23150d9",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident maiores deleniti excepturi, rem incidunt dolores, dolore quasi culpa reiciendis sit nostrum illo alias perferendis enim repudiandae? Harum ut nostrum explicabo.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dvuwlh8op/image/upload/v1705094008/YelpCamp/dooiv6gtlujmj7ijz3dl.jpg",
          filename: "YelpCamp/dooiv6gtlujmj7ijz3dl",
        },
        {
          url: "https://res.cloudinary.com/dvuwlh8op/image/upload/v1705094008/YelpCamp/nqusq1ryjzciw0kxa935.jpg",
          filename: "YelpCamp/nqusq1ryjzciw0kxa935",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
