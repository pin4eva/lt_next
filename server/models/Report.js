const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  vol: String,
  year: String,
  title: String,
  appellant: String,
  respondent: String,
  suit_no: String,
  page_no: String,
  date: Date,
  appeal: String,
  court: String,
  judges: [
    {
      judge: { type: Schema.Types.ObjectId, ref: "Judge" },
      role: String,
    },
  ],
  counsel: {
    appellant: String,
    respondent: String,
  },
  aspects_of_law: String, //formally catchwords
  summary_of_facts: String,
  issues_of_determination: String,
  cases_cited: String,
  books_cited: String,
  judgment: String,
  issues: {
    status: { type: String, default: "unanimously dismissing the appeal" },
    ratios: [{ type: Schema.Types.ObjectId, ref: "Ratio" }],
  },
});

const RatioSchema = new Schema({
  heading: String,
  contents: [
    {
      quoted: { type: mongoose.Schema.Types.ObjectId, ref: "Judge" },
      ref: String, // Paragraph ID or refrence ID
      body: String,
    },
  ],
});

const Report = mongoose.module("Report", ReportSchema);
const Ratio = mongoose.module("Ratio", RatioSchema);

module.exports = {
  Report,
  Ratio,
};
