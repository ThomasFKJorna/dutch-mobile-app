import React, { Component } from "react";
//import "../assets/style.css";
import QuizService from "../questionAPI";
import QuestionBox from "./QuestionBoxSimple";
import Result from "./Result";
import { Card, Text, Button } from "@ui-kitten/components";
import { View } from "react-native";


export interface Props {
  gameOptions: any[],
}

interface State {
  questionBank: any[],
  answers: string[],
  score: number,
  responses: number,
  numberOfQuestions: number,
};
class Quiz extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      questionBank: [],
      answers: [],
      score: 0,
      responses: 0,
      numberOfQuestions: props.gameOptions[0],
    };
  };


  getQuestions = () => {
    QuizService(this.state.numberOfQuestions, this.props.gameOptions[1]).then(options => {
      let randomAnswers = options.map((option) => {
        let answer: string = option.options[Math.floor(Math.random() * option.options.length)];
        return {
          "options": option.options,
          "questionId": option.questionId,
          "correctAnswer": answer,
        };
      });
      this.setState({
        questionBank: randomAnswers
      });
    });

  };

  computeAnswer = (answer: any) => {
    this.setState({
      score: this.state.score + answer
    });

    this.setState({
      responses: this.state.responses < this.state.numberOfQuestions ? this.state.responses + 1 : this.state.numberOfQuestions
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    });
  };



  componentDidMount() {
    this.getQuestions();
  };

  render() {
    return (
      <View>
        {
          this.state.questionBank.length > 0 &&
          this.state.responses < this.state.numberOfQuestions &&
          <QuestionBox
            antwoord={this.state.questionBank[this.state.responses].correctAnswer}
            options={this.state.questionBank[this.state.responses].options}
            key={this.state.questionBank[this.state.responses].questionId}
            selected={this.computeAnswer}
          />

        }

        {
          this.state.responses === this.state.numberOfQuestions ? (
            <Button
              onPress={() => {
                this.playAgain()
              }}> Again {this.state.score}/{this.state.numberOfQuestions} </Button>
            //<Result
            //  score={this.state.score}
            //  playAgain={this.playAgain}
            //  goBack={this.props.goBack}
            //  numberOfQuestions={this.state.numberOfQuestions}
            //  setGameoption={this.props.setGameOptions}
            // />
          ) : null
        }
      </View>
    );
  }
}

export default Quiz;