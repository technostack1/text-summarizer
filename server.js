const express = require('express');
const app = express();
const port = 2000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/summarize', (req, res) => {
  // You can add the summarization logic here
  let SummarizerManager = require("node-summarizer").SummarizerManager;

  const content = req.body.text;
  const numSentences = req.body?.numSentences? req.body.numSentences : 2;


  let Summarizer = new SummarizerManager(content,numSentences); 
  let summary = Summarizer.getSummaryByFrequency().summary;
  
  // For now, we are just returning the input text as the summary
  res.render('result', { summary: summary });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
