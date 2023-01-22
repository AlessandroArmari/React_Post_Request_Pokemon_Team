import { useState } from "react";
import { AddPkmn } from "./components/AddPkmn";
import { PkmnList } from "./components/PkmnList";

function App() {
  const [team, setTeam] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchOrderHandler() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        //--->response is a promise!
        "https://ad42ea69-6901-43e3-a8b4-67bdeeeaf70b.mock.pstmn.io/lance"
      );
      if (!response.ok) {
        //check later!!!!
        throw new Error("ERROR: Something went wrong");
      }
      const data = await response.json();
      const dataMapped = data.lanceTeam.map((pkmn) => {
        return {
          name: pkmn.name,
          pokedexIndex: pkmn.pokedexIndex,
          type: pkmn.type,
          generation: pkmn.generation,
          sprite: pkmn.sprite,
        }; //--->REMEMBER: YOU'RE GETTING THE LIST WICH IS THE VALUE OF THE FIRST PROPERTY (lanceTeam) OF DATA
      });

      setTeam(dataMapped);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }

    setIsLoading(false);
  }

  //HERE the function "fetchOrderHandler" ends!
  //(GET)

  //++++++++++++++++++++++++++++++++++++++++++++++++++++

  //HERE the function "addPkmnHandler" begins!
  //(POST)

  const addPkmnHandler = async (newPkmn) => {
    const response = await fetch(
      "https://ad42ea69-6901-43e3-a8b4-67bdeeeaf70b.mock.pstmn.io/lance",
      {
        method: "POST", //---> the default method is GET. Now we change it to POST
        body: JSON.stringify(newPkmn), //--->I "gave" to the URL the "stringified" body of the pkmn I created in the component "AddPkmn.jsx"
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json(); //---> await 200 response

    setTeam((team) => [...team, newPkmn]); //---> adding newPkmn to the array (Lance's team)

    console.log(data);
    console.log(team);
  };

  let content; //NOT CONST--->BECAUSE IT CHANGES

  if (team.length > 0) {
    content = <PkmnList listOfPkmn={team} />;
  }

  if (isLoading) {
    content = <span className="loading">Is Loading...</span>;
  }

  if (error) {
    content = <div className="error">{error}</div>;
  }

  return (
    <div>
      <section className="content">
        {team.length > 0 && (
          <h2 className="title">Lance's Team in Pkmn Red </h2>
        )}
        {content}
        <div className="buttonSection">
          <button onClick={fetchOrderHandler}>Show Lance Team</button>
          {/* {!content && ( //--->IF CONTENT is NUll, shows---> button
            <button onClick={fetchOrderHandler}>Show Lance Team</button>
          )} */}
        </div>
      </section>
      {/*props--->activate the function addPkmnHandler*/}
      {team.length != 0 && <AddPkmn onAddPkmn={addPkmnHandler} />}
      {/*here I avoid to show Create new Pkmn form if the client didn't click "Show Team" yet!
      Because in that case the variable "team" would consist ONLY in the pkmn I created, */}
    </div>
  );
}

export default App;
