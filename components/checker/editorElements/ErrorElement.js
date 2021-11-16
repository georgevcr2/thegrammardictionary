const style = {
  backgroundColor: "red",
};

const ErrorElement = (props) => {
  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

export default ErrorElement;
