/* eslint-disable react/no-unknown-property */
import { useState, useRef, useMemo, forwardRef, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";

/* =======================
   SILK SHADER UTILS
======================= */
const hexToNormalizedRGB = (hex) => {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uNoiseIntensity;

float noise(vec2 p) {
  return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv * uScale;
  uv.y += 0.04 * sin(8.0 * uv.x - uTime * uSpeed);

  float pattern =
    0.6 +
    0.4 *
      sin(
        5.0 *
          (uv.x +
            uv.y +
            cos(3.0 * uv.x + 5.0 * uv.y) +
            0.02 * uTime)
      );

  float rnd = noise(gl_FragCoord.xy);
  vec3 col = uColor * pattern - rnd * 0.08 * uNoiseIntensity;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* =======================
   SILK PLANE
======================= */
const SilkPlane = forwardRef(({ uniforms }, ref) => {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [viewport, ref]);

  useFrame((_, delta) => {
    ref.current.material.uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

/* =======================
   FAQ DATA
======================= */
const faqs = [
  {
    question: "What is this TechFest about?",
    answer:
      "This TechFest is a national-level technical festival bringing together students and innovators for hackathons, workshops, and competitions."
  },
  {
    question: "Who can participate?",
    answer:
      "Any undergraduate or postgraduate student from a recognized institution can participate."
  },
  {
    question: "Is the hackathon online or offline?",
    answer:
      "The hackathon is conducted completely offline at the host campus."
  },
  {
    question: "How long does the hackathon last?",
    answer:
      "The hackathon runs continuously for 36–48 hours."
  },
  {
    question: "How many members are allowed in a team?",
    answer:
      "Each team can have 2 to 4 members."
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No. Participation is completely free."
  }
];

/* =======================
   FAQ COMPONENT
======================= */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 3.5 },
      uScale: { value: 1.4 },
      uNoiseIntensity: { value: 1.2 },
      uColor: { value: new Color(...hexToNormalizedRGB("#22d3ee")) }
    }),
    []
  );

  return (
    <section
      id="faq"
      className="relative min-h-screen overflow-hidden"
    >
      {/* OPTIONAL BACKGROUND */}
      {/*
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]}>
          <SilkPlane ref={meshRef} uniforms={uniforms} />
        </Canvas>
      </div>
      */}

      <div className="absolute inset-0 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_0_120px_-40px_rgba(34,211,238,0.6)]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-12 md:mb-14 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden border border-white/10 bg-white/5"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 text-left text-white font-medium hover:bg-white/10 transition"
                >
                  <span className="text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <span className="text-xl sm:text-2xl text-cyan-400">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openIndex === index
                      ? "max-h-96 px-4 sm:px-6 pb-4 sm:pb-5"
                      : "max-h-0 px-4 sm:px-6"
                  }`}
                >
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
