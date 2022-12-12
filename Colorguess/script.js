function setup() {
    const cards = [...document.querySelectorAll(".card")]
    cards.map((card) => addEventListener("click", (event) => {
        cards.map((x) => x.innerHTML = "down");
        event.target.innerHTML = "up";
        console.log(event.target, cards);
    }))
  }
  
  // Example case. 
  document.body.innerHTML = `
  <table id="card-container">
    <tbody>
      <tr>
        <td class="card">down</td>
        <td class="card">up</td>
      </tr>
      <tr>
        <td class="card">down</td>
        <td class="card">down</td>
      </tr>
    </tbody>
  </table>`;
  
  setup();
  
  document.getElementsByClassName("card")[0].click();
  console.log(document.body.innerHTML);