const mongoose = require("mongoose");

//  university list schema start
const CountrySchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  country: {
    type: String,
    required: [true, "College Code is missing"],
  },
  state: {
    type: String,
    unique: true,
    required: [true, "College Name is missing"],
  },
  districts: {
    type: Array,
    required: [true, "District Name is missing"],
  },
});

const india = mongoose.model("india", CountrySchema);
const england = mongoose.model("england", CountrySchema);
const nepal = mongoose.model("nepal", CountrySchema);
const russia = mongoose.model("russia", CountrySchema);
const sri_lanka = mongoose.model("sri_lanka", CountrySchema);
const bangladesh = mongoose.model("bangladesh", CountrySchema);
const afghanistan = mongoose.model("afghanistan", CountrySchema);
const pakistan = mongoose.model("pakistan", CountrySchema);

module.exports = {
  india,
  england,
  nepal,
  russia,
  sri_lanka,
  bangladesh,
  afghanistan,
  pakistan,
};
