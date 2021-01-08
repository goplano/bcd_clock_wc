import BCDLight from './BcdLight';

export default class BcdDigit extends HTMLElement {

    constructor() {
        super();
        this.value = 0;
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.light1 = new BCDLight();
        this.light2 = new BCDLight();
        this.light3 = new BCDLight();
        this.light4 = new BCDLight();
        this.shadowRoot.innerHTML = `
<style>
.bcd_digits {
    row-gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    }
</style>
<div class="bcd_digits">

</div>
`;
        const myDiv = this.shadowRoot.querySelector(".bcd_digits");
        myDiv.prepend(this.light1);
        if(this.max >= 2) {
            myDiv.prepend(this.light2);
        }
        if(this.max >= 4) {
            myDiv.prepend(this.light3);
        }
        if(this.max >= 8) {
            myDiv.prepend(this.light4);
        }
    this.setValue();

    }
    pos0() {
        return (parseInt(this.value) & 1) > 0;
    }
    pos1() {
        return (parseInt(this.value) & 2) > 0;
    }
    pos2() {
        return (parseInt(this.value) & 4) > 0;
    }
    pos3() {
        return (parseInt(this.value) & 8) > 0;
    }
    setValue() {
        if(this.light1) {
            this.light1.on = this.pos0();
            this.light2.on = this.pos1();
            this.light3.on = this.pos2();
            this.light4.on = this.pos3();
        }

    }
    static get observedAttributes() {
        return ["max", "value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            switch (name) {
                // boolean attributes

                // value attributes
                case "value":
                    this.value = newValue;
                    this.setValue();
                    break;
                case "max":
                    this.max = newValue
                    break;
            }
        }
    }
    get max() {
        if(this.hasAttribute("max")) {
            return this.getAttribute('max');
        }
        return 9;
    }

    set max(newValue) {
        this.setAttribute('max', newValue);
    }
    get value() {
        if(this.hasAttribute("value")) {
            return this.getAttribute('value');
        }
        return 0;
    }

    set value(newValue) {
        this.setAttribute('value', newValue);
        }
}
customElements.define('bcd-digit', BcdDigit);