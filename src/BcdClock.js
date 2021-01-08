import BcdDigit from "./BcdDigit";
export default  class BcdClock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.hours1 = new BcdDigit();
        this.hours1.max = 2;
        this.hours2 = new BcdDigit();
        this.minutes1 = new BcdDigit();
        this.minutes1.max = 5;
        this.minutes2 = new BcdDigit();
        this.seconds1 = new BcdDigit();
        this.seconds1.max = 5;
        this.seconds2 = new BcdDigit();
        this.getTime();
    }
    getTime() {
        this.time = new Date();
        this.setTime();
    }
    hours() {
        return this.time.getHours()
    }
    minutes() {
        return this.time.getMinutes()
    }
    seconds() {
        return this.time.getSeconds()
    }
    disconnectedCallback() {
        clearTimeout(this.timer);
    }
    setTime() {
        this.hours1.value = this.hours() /10;
        this.hours2.value = this.hours() %10;
        this.minutes1.value = this.minutes() /10;
        this.minutes2.value = this.minutes() %10;
        this.seconds1.value = this.seconds() /10;
        this.seconds2.value = this.seconds() %10;
    }
    connectedCallback() {

        this.timer = setInterval(this.getTime.bind(this), 1000);
        this.setTime();
        this.shadowRoot.innerHTML = `
<style>
.group {
display:flex;
flex-direction: row;
gap: 1vw;
padding: 1vw;
}
</style>
<div class="group" id="hours">
</div>
<div class="group" id="minutes">    
</div>
<div class="group" id="seconds">
</div>

`;
        this.shadowRoot.querySelector("#hours").appendChild(this.hours1);
        this.shadowRoot.querySelector("#hours").appendChild(this.hours2);
        this.shadowRoot.querySelector("#minutes").appendChild(this.minutes1);
        this.shadowRoot.querySelector("#minutes").appendChild(this.minutes2);
        this.shadowRoot.querySelector("#seconds").appendChild(this.seconds1);
        this.shadowRoot.querySelector("#seconds").appendChild(this.seconds2);
    }
}
customElements.define('bcd-clock', BcdClock);

