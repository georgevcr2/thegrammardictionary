import uniqid from "uniqid";

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
        const grammaticalMistakes = handleGrammaticalMistakes(
          response.data.matches
        );

        return {
          message: "successful!",
          body: {
            issues: grammaticalMistakes.allIssues,
            text: createHTML(
              response.status,
              grammaticalMistakes,
              reqData.text
            ),
          },
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
  matches.forEach((issue) => {
    //change this to map
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
  //console.log("axios response: ", issues);
  data = { ...data, allIssues: issues };
  return data;
};

const createHTML = (status, grammaticalMistakes, originalText) => {
  if (status == 200) {
    const grammarIssues = grammaticalMistakes.allIssues;
    let newJSXString = [];
    if (grammarIssues.length > 0) {
      newJSXString.push(
        { text: originalText.substring(0, grammarIssues[0].offset) },
      );
      grammarIssues.forEach((ele, index, arr) => {
        const nextStart = ele.offset + ele.length;
        const errorText = originalText.substring(ele.offset, nextStart);
        let remainderText = "";
        if (arr[index + 1] !== undefined) {
          remainderText = originalText.substring(
            nextStart,
            arr[index + 1].offset
          );
        } else {
          remainderText = originalText.substring(
            nextStart,
            originalText.length
          );
        }
        newJSXString.push(
          { text: errorText, error: true },
          { text: remainderText }
        );
      });
      //console.log(newJSXString);
    } else {
      newJSXString.push({ text: originalText })
    }
    return [
      {
        type: "paragraph",
        children: newJSXString,
      },
    ];
  } else {
    //network err
  }
};

export default handler;