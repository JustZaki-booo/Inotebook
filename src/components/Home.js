import Notes from '../components/Notes';
// Home component to display notes and a form to add new notes

function Home(props) { 
  const { showAlert} = props;
  return (
    <>

  <Notes showAlert = {props.showAlert}/>
  
    </>
  )
}

export default Home