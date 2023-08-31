import { LitElement, html, css } from "lit";
import "./component-list"

class Ejercicio extends LitElement {

    static styles = css`
        .section {
            padding: 30px 0px 30px 0px;
        }
        .input-container {
            height: 50px;
            position: relative;
            width: 100%;
            margin-top: 30px;
            margin-bottom: 30px;
        }

        .input {
            background-color: #303245;
            border-radius: 12px;
            border: 0;
            box-sizing: border-box;
            color: #eee;
            font-size: 18px;
            height: 100%;
            outline: 0;
            padding: 4px 20px 0;
            width: 100%;
        }

        .select-container {
            width: 200px;
        }
          
        .select-style {
            background-color: #f2f2f2;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px;
            width: 100%;
            font-size: 14px;
            color: #333;
            cursor: pointer;
        }
        option{
            cursor: pointer;
        }
    `;

    static properties = {
        arrayPersonajes: { tpe: Array },
        arrayFiltrados: { tpe: Array },
        arraySelect: { type: Array },
        arraySelectFilter: { type: Array },
        value: { type: String },
        valueInput: { type: String }
    }

    constructor() {
        super();
        this.arrayPersonajes = [];
        this.arrayFiltrados = [];
        this.arraySelect = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
        this.arraySelectFilter = [];
        this.getFetchApi();
    }

    async getFetchApi() {
        const resp = await fetch('https://hp-api.onrender.com/api/characters');
        const json = await resp.json();
        this.arrayPersonajes = json;
    }

    handleKeyDown(event) {
        if (event.key === "Enter" && this.arrayPersonajes.length > 0) {
            const value = event.target.value;
            this.arrayFiltrados = this.arrayPersonajes.filter(personaje => personaje.name.toLowerCase().includes(value));
            this.valueInput = value;
            event.target.value = '';

        }
    }

    selectPersonaje(event) {
        const selectedHouse = event.target.value;
        this.value = selectedHouse;
        if (selectedHouse && this.arrayPersonajes.length > 0) {
            this.arraySelectFilter = this.arrayPersonajes.filter(personaje =>
                personaje.house.toLowerCase().includes(selectedHouse.toLowerCase())
            );
        } else if (selectedHouse === 'Selecciona un valor') {
            this.arraySelectFilter = [];
        }
    }

    render() {
        return html`


            <section class="section">
                <h2>Buscar Personaje:</h2>
                <div class="input-container">
                    <input class="input" type="text" @keydown=${this.handleKeyDown}>
                </div>

                ${this.valueInput
                ? html`
                        <h3>Resultados para: ${this.valueInput}</h3>
                        <component-list .arrayPersonajes="${this.arrayFiltrados}" ></component-list>
                    `
                : ``}
            </section>

            <section class="section">

                <h2>Seleccionar Personaje</h2>
                    <div class="select-container">
                        <select class="select-style" name="personajes" @change="${this.selectPersonaje}">
                            <option value="Selecciona un valor">Selecciona un valor</option>
                            ${this.arraySelect.map(house => html` <option value="${house}">${house}</option>`)}
                        </select>
                    </div>


                
                ${this.arraySelectFilter.length > 0
                ? html`
                    <h3>Resultados para ${this.value}</h3>
                    <component-list .arrayPersonajes="${this.arraySelectFilter}" ></component-list>
                    `
                : ``}
            </section>
            
            <section class="section">
                <h2>Todos los personajes: </h2>
                ${this.arrayPersonajes
                ? html`
                    <component-list .arrayPersonajes="${this.arrayPersonajes}" ></component-list>
                    `
                : ``}
            </section>



        `
    }

}

customElements.define('my-ejercicio', Ejercicio);

