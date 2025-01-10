import { useState } from "react";

export function Caratteristiche() {

const [data, setData]=useState({
    sesso:'',
    peso:'',
    attivita:'',
    monitoraggio:'',
    gruppo:'',
    sfide:'',

})

const handleSubmit=(event)=>{
    event.preventDefault()


    setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      const users=localStorage.getItem('users')
      const parseUsers= JSON.parse(users)

  

}



  return (
    <div>
      <h4>LE TUE CARATTERISTICHE!</h4>
      <form className="form" onSubmit={handleSubmit}>
        <label>Sesso:</label>
        <select id="sesso">
          Scegli un opzione:
          <option value="uomo">Uomo</option>
          <option value="donna">Donna</option>
        </select>

        <label >Inserisci il tuo peso</label>
        <input type="number" id="peso"   />

        <label> Inserisci la tua età!</label>
        <input type="number" id="eta"   />

        <label>Quanto spesso fai attività fisica?</label>
        <select id="attivita">
          Scegli un opzione:
          <option value="0">Quasi mai</option>
          <option value="2">1-2 volte a settimana</option>
          <option value="4">3-4 volte a settiman</option>
          <option value="5">Più di 5 volte a settiman</option>
        </select>

        <label>Hai esperienza con il monitoraggio delle attività fisiche?</label>
        <select id="monitoraggio">
          Scegli un opzione:
          <option value="si">Si</option>
          <option value="no">No</option>
         
        </select>

        <label>Ti piace allenarti da solo o in gruppo?</label>
        <select id="gruppo">
          Scegli un opzione:
          <option value="solo">Solo</option>
          <option value="gruppo">Gruppo</option>
          <option value="entrambi">Entrambi</option>
         
        </select>

        <label>Ti piacerebbe partecipare partecipare a sfide o gare tramite l'app? </label>
        <select id="sfide">
          Scegli un opzione:
          <option value="si">Si</option>
          <option value="no">No</option>
          
         
        </select>

        <button>Torna indietro</button>
        <button type="submit">Avanti</button>



      </form>
    </div>
  );
}
