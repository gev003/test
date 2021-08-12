import "./App.css";
import { Component } from "react";
import reactDom from "react-dom";
import qBank from "./info";
import QuestionBox from "./questionBox/questionBox";
import Result from "./questionBox/Result";

export default class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
  };

  getQuestion = () => {
    qBank().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
    });
  };

  playAgain = () => {
    this.getQuestion();
    this.setState({
      score: 0,
      responses: 0,
    });
  };

  componentDidMount() {
    this.getQuestion();
  }

  render() {
    console.log("this.state.questionBank", this.state.questionBank);
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={(answer) => {
                  this.computeAnswer(answer, correct);
                }}
              />
            )
          )}
        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}
