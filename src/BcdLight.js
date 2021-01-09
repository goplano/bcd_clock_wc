import BcdClock from "./BcdClock";

export default class BcdLight extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._upgradeProperty("on");
        this.shadowRoot.innerHTML = `
<style>
:host {
    display:block;
}
:host([hidden]) {
    display: none;
  }
:host svg {
    border-radius: 100%;
    background-color: rgba(200, 200, 200, 0.2);
    box-shadow: inset 0 0 0 0 rgba(200, 200, 200, 0.2);
    height: 100%;
    width: 100%;
    color: inherit;
}
</style>
<svg
     viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="40%" style="stop-color:rgb(240,240,240);stop-opacity:0"/>
            <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:0.2"/>
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:.7"/>
            <stop offset="100%" style="stop-color:rgb(240,240,240);stop-opacity:0"/>
        </linearGradient>
        <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4"" />
        </filter>
        <clipPath id="myClip">
            <circle cx="50.5" cy="50.5" r="45"/>
        </clipPath>
    </defs>
    <circlec x="50.5" cy="50.5" r="45" fill="#444"/>
    <circle  id="on"  cx="50.5" cy="50.5" r="45" fill="#ff0" fill-opacity=".9"  style="fill: currentColor;"/>
    <ellipse clip-path="url(#myClip)" cx="50.5" cy="80" rx="30" ry="20" fill="url(#grad1)" fill-opacity="0.5" filter="url(#blurMe)" />
    <ellipse clip-path="url(#myClip)" cx="50.5" cy="22" rx="25" ry="15" fill="url(#grad2)" fill-opacity=".5" filter="url(#blurMe)"/>
</svg>
`;
        this.turnLightOff();
    }

    static get observedAttributes() {
        return ["on", "template"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            switch (name) {
                // boolean attributes
                case "on":
                    const elem = this.shadowRoot.querySelector('#on');
                    if (newValue !== null) {
                        this.turnLightOn();
                    } else {
                        this.turnLightOff();
                    }
                    break;
                // value attributes
                case "template":
                    this.template = newValue;
                    break;
            }
        }
    }

    turnLightOff() {
        this.shadowRoot.querySelector('#on').setAttribute('display', 'none')
    }

    turnLightOn() {
        this.shadowRoot.querySelector('#on').setAttribute('display', 'block')
    }

    get on() {
        return this.hasAttribute('on');
    }

    set on(newValue) {
        const isOn = Boolean(newValue);
        if (isOn) {
            this.setAttribute('on', '');
        } else {
            this.removeAttribute('on');
        }
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }
}
customElements.define('bcd-light', BcdLight);