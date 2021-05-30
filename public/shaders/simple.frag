precision lowp float;
uniform float time;
uniform vec2 resolution;
// uniform vec2 joints[4];
uniform vec2 nose;
// uniform float jointsX[16];
// uniform float jointsY[16];

#define PI  3.14159265359

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Quintic interpolation curve
    vec2 u = f*f*f*(f*(f*6.-15.)+10.);
     u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 color = vec3(1., .5, .75);

    // for(int i = 0; i< 15 ; i++){
    //   vec2 p = joints[i] - uv;
    //   // vec2 p = vec2(.5) -uv;
    //   float r = length(p);
    //   float a = atan(p.x, p.y);
    //
    //   color -= smoothstep(.1, .2, r);
    // }

    vec2 p = nose - uv;
    float r = length(p);
    // float a = atan(p.x, p.y);
    //
    // color -= smoothstep(.1, .2, r);
    float n = noise(uv + p * 5.);
    n = noise(uv * n * 5.);
    n += noise(uv * n * 2.5) - .5;
    n += noise(uv * n + p + time*.1) - .5;
    color += n-.5;

    color.b += r *.75;
    color *= .85;

    // for(int i = 0; i< 15 ; i++){
    //   vec2 p = vec2(jointsX[i], jointsY[i]) - uv;
    //   // vec2 p = vec2(.5) -uv;
    //   float r = length(p);
    //   float a = atan(p.x, p.y);
    //
    //   color -= smoothstep(.1, .2, r);
    // }

    gl_FragColor = vec4(color,1.0);
}
