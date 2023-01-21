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

  //+++HERE the function "fetchOrderHandler" ends!

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
          {!content && ( //--->IF CONTENT is NUll, shows---> button
            <button onClick={fetchOrderHandler}>Show Lance Team</button>
          )}
        </div>
      </section>

      <AddPkmn />
    </div>
  );
}

export default App;
