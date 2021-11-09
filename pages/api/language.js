import uniqid from 'uniqid';

async function handler(req, res) {
  //console.log("Inside the api handler function");
  if (req.method === "POST") {
    const axios = require("axios");
    const reqData = JSON.parse(req.body);

    //console.log("request data: ", reqData);

    const responseData = await axios
      .post("https://api.languagetool.org/v2/check", null, {
        params: {
          disabledRules: "WHITESPACE_RULE,FRENCH_WHITESPACE",
          allowIncompleteResults: "true",
          enableHiddenRules: "true",
          level: "picky",
          text: reqData.text,
          language: reqData.language,
        },
      })
      .then((response) => {
        console.log("axios response: ", response.data.matches);
        const grammaticalMistakes = handleGrammaticalMistakes(
          response.data.matches
        );
        return {
          message: "successful!",
          body: { ...grammaticalMistakes },
        };
      })
      .catch((error) => {
        console.log("axios error response: ", error);
        return { message: "error in axios call." };
      });

    res.status(201).json(responseData);
  } else {
    res.status(201).json("this is not a POST request.");
  }
}

const handleGrammaticalMistakes = (matches) => {
  let data = { issueAmount: matches.length };
  let issues = [];
  //console.log("in GM function ", matches);
  matches.forEach((issue) => { //change this to map
    issues.push({
      id: uniqid(),
      title: issue.rule.category.name,
      message: issue.message,
      shortMessage: issue.shortMessage,
      description: issue.rule.description,
      replacements: issue.replacements,
      offset: issue.offset,
      length: issue.length,
    });
  });
  console.log("axios response: ", issues);
  data = { ...data, allIssues: issues};
  return data;
};

export default handler;
