import light from './assets/img/light.svg';

export default class BcdLight extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.max = 9;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
<style>
.light {
    border-radius: 100%;
    background-color: rgba(200, 200, 200, 0.2);
    box-shadow: inset 0 0 0 0 rgba(200, 200, 200, 0.2);
    height: 100%;
    width: 100%;
}
</style>
<div class="light"><svg version="1.1"
    width="100%"
    height="100%"
     viewBox="0 0 100 100"
     baseProfile="full"
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
    <circle  id="on"  cx="50.5" cy="50.5" r="45" fill="#ff0" fill-opacity=".9"  style="fill:var(--color_palette, #ff0);"/>
    <ellipse clip-path="url(#myClip)" cx="50.5" cy="80" rx="30" ry="20" fill="url(#grad1)" fill-opacity="0.5" filter="url(#blurMe)" />
    <ellipse clip-path="url(#myClip)" cx="50.5" cy="22" rx="25" ry="15" fill="url(#grad2)" fill-opacity=".5" filter="url(#blurMe)"/>


</svg></div>
`;
        if (this.on !== "on") {
            this.shadowRoot.querySelector('#on').setAttribute('display', 'none')
        }

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
                    if (this.shadowRoot.querySelector('#on')) {
                        if (newValue === "true") {
                            this.shadowRoot.querySelector('#on').setAttribute('display', 'block')
                        } else {
                            this.shadowRoot.querySelector('#on').setAttribute('display', 'none')
                        }
                    }
                    break;
                // value attributes
                case "template":
                    this.template = newValue;
                    break;
            }
        }
    }

    get on() {
        return this.getAttribute('on');
    }

    set on(newValue) {
        this.setAttribute('on', newValue);
    }

}

customElements.define('bcd-light', BcdLight);