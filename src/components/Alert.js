function Alert(props) {
  const capital = (word) => {
    if (word === "danger") {
      word = "Error";
    }
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div style={{ height: "60px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capital(props.alert.type)}: </strong>
          {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;

