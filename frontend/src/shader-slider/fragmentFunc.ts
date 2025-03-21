export const fragmentFunc = () => {
    return `
        uniform float progress;
uniform sampler2D from;
uniform sampler2D to;
uniform float strength; // Новая униформа

varying vec2 vUv;

// Функции для получения цвета из текстур
vec4 getFromColor(vec2 uv) {
    return texture2D(from, uv);
}

vec4 getToColor(vec2 uv) {
    return texture2D(to, uv);
}

// Новая функция transition
vec4 transition(vec2 p) {
    vec4 ca = getFromColor(p);
    vec4 cb = getToColor(p);
    
    vec2 oa = (((ca.rg + ca.b) * 0.5) * 2.0 - 1.0);
    vec2 ob = (((cb.rg + cb.b) * 0.5) * 2.0 - 1.0);
    vec2 oc = mix(oa, ob, 0.5) * strength;
    
    float w0 = progress;
    float w1 = 1.0 - w0;
    return mix(getFromColor(p + oc * w0), getToColor(p - oc * w1), progress);
}

void main() {
    gl_FragColor = transition(vUv);
}
    `
}
