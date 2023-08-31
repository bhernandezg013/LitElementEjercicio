import { LitElement, html } from "lit";

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
        console.log(this.arrayPersonajes);
    }

    handleKeyDown(event) {
        if (event.key === "Enter" && this.arrayPersonajes.length > 0) {
            const value = event.target.value;
            console.log(value);
            this.arrayFiltrados = this.arrayPersonajes.filter(personaje => personaje.name == value);
        }
    }

    selectPersonaje(event, house) {
        if (this.arrayPersonajes.length > 0 ) {
            this.arraySelectFilter = this.arrayPersonajes.filter(personaje => personaje.house == house)
        }
    }

    render() {
        return html`

            <h1>Buscar Personaje:</h1>
            <input type="text" @keydown=${this.handleKeyDown}>
            <ul>
                ${this.arrayFiltrados.length > 0
                ? html`
                    ${this.arrayFiltrados.map((personaje, index) =>
                    html`<li>
                        ${personaje.name}
                        <img src=${personaje.image ? personaje.image : 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1'} style="width: 50px;">
                    </li>`
                )}
                `
                : html``
            }
            </ul>


            <h1>Seleccionar Personaje</h1>
            <select name="personajes">
                <option value="">selecciona un valor</option>
                <option @click="${event => this.selectPersonaje(event, 'Gryffindor')}" value="Gryffindor">Gryffindor</option>
                <option @click="${event => this.selectPersonaje(event, 'Hufflepuff')}" value="Hufflepuff">Hufflepuff</option>
                <option @click="${event => this.selectPersonaje(event, 'Ravenclaw')}" value="Ravenclaw">Ravenclaw</option>
                <option @click="${event => this.selectPersonaje(event, 'Slytherin')}" value="Slytherin">Slytherin</option>
            </select>
            <ul>
                ${this.arraySelectFilter.length > 0
                ? html`
                    ${this.arraySelectFilter.map((personaje, index) =>
                    html`<li>
                        ${personaje.name}
                        <img src=${personaje.image ? personaje.image : 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1'} style="width: 50px;">
                    </li>`
                )}
                `
                : html``
            }
            </ul>
            

            




            <h1>Todos los personajes: </h1>
            
            <ul>
                ${this.arrayPersonajes.length > 0
                ? html`
                    ${this.arrayPersonajes.map((personaje, index) =>
                    html`<li>
                        ${personaje.name}
                        <img src=${personaje.image ? personaje.image : 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1'} style="width: 50px;">
                    </li>`
                )}
                `
                : html`No hay elementos`
            }
            </ul>

        `
    }

}

customElements.define('my-ejercicio', Ejercicio);

