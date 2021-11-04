import React from "react";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Part = (props) => {
  const { part } = props;
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const { parts } = props;
  //console.log(parts);
  //let total = 0;
  //for (let i = 0; i < parts.length; i++){
  //  total+=parts[i].exercises;
  //}
  const total = parts.reduce((a, b) => {
    // console.log('here', a, b);
    return a + b.exercises;
  }, 0);

  //console.log(total);
  return <p>total of {total} exercises</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
