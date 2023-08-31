import { LitElement, html } from "lit";
import "./component-list"

class Ejercicio extends LitElement {

    static properties = {
        arrayPersonajes: { tpe: Array },
        arrayFiltrados: { tpe: Array },
        arraySelect: { type: Array },
        arraySelectFilter: { type: Array }
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
            // this.arrayFiltrados = this.arrayPersonajes.filter(personaje => personaje.name == value);
            this.arrayFiltrados = this.arrayPersonajes.filter(personaje => personaje.name.toLowerCase().includes(value));
            event.target.value = '';
        }
    }

    selectPersonaje(event) {
        const selectedHouse = event.target.value;
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

            <h1>Buscar Personaje:</h1>
            <input type="text" @keydown=${this.handleKeyDown}>
            ${this.arrayPersonajes
                ? html`
                    <component-list .arrayPersonajes="${this.arrayFiltrados}" ></component-list>
                `
                : `Cargando Personajes`
            }


            <h1>Seleccionar Personaje</h1>
            <select name="personajes" @change="${this.selectPersonaje}">
                <option value="Selecciona un valor">Selecciona un valor</option>
                ${this.arraySelect.map(house => html`
                    <option value="${house}">${house}</option>
                `)}
            </select>

            ${this.arraySelectFilter.length > 0
                ? html`
                    <component-list .arrayPersonajes="${this.arraySelectFilter}" ></component-list>
                `
                : ``
            }
            

        
            <h1>Todos los personajes: </h1>
            
            ${this.arrayPersonajes
                ? html`
                    <component-list .arrayPersonajes="${this.arrayPersonajes}" ></component-list>
                `
                : `Cargando Personajes`
            }



        `
    }

}

customElements.define('my-ejercicio', Ejercicio);

