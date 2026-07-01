import * as React from "react";
const _jsxFileName = "";import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/language";
import { SectionUpload } from "@/components/section-upload";


const getArchetypes = (l) => ({
  heroina: {
    name: l("La Heroína", "The Heroine"),
    title: l("La que supera obstáculos con valentía", "She who overcomes obstacles with courage"),
    desc: l("Eres la protagonista de tu propia historia. Tu propósito es demostrar que es posible y abrir camino para otras.", "You are the protagonist of your own story. Your purpose is to show it's possible and open the way for others."),
    gifts: [l("Coraje inquebrantable","Unbreakable courage"), l("Liderazgo bajo presión","Leadership under pressure"), l("Capacidad de reinventarse","Ability to reinvent yourself"), l("Inspiración por el ejemplo","Leading by example")],
    shadow: l("El agotamiento por cargar demasiado y no pedir ayuda.", "Exhaustion from carrying too much and not asking for help."),
    invitation: l("Permítete ser apoyada. La verdadera heroína sabe delegar y recibir.", "Allow yourself to be supported. The true heroine knows how to delegate and receive."),
    color: "text-primary", bg: "from-red-50 to-rose-50",
  },
  mentora: {
    name: l("La Mentora", "The Mentor"),
    title: l("La que guía con sabiduría y amor", "She who guides with wisdom and love"),
    desc: l("Tu propósito es transmitir conocimiento y abrir puertas. Eres la guía que otros necesitan en sus momentos más decisivos.", "Your purpose is to share knowledge and open doors. You are the guide others need in their most decisive moments."),
    gifts: [l("Sabiduría profunda","Deep wisdom"), l("Paciencia infinita","Infinite patience"), l("Capacidad de ver el potencial","Ability to see potential"), l("Generosidad de espíritu","Generosity of spirit")],
    shadow: l("Dar sin límites y olvidarte de tus propias necesidades.", "Giving without limits and forgetting your own needs."),
    invitation: l("Enseña desde tu abundancia, no desde tu escasez.", "Teach from your abundance, not your scarcity."),
    color: "text-gold", bg: "from-amber-50 to-yellow-50",
  },
  exploradora: {
    name: l("La Exploradora", "The Explorer"),
    title: l("La que busca aventura y libertad", "She who seeks adventure and freedom"),
    desc: l("Tu propósito es descubrir, innovar y mostrar que hay más allá del horizonte conocido.", "Your purpose is to discover, innovate and show what lies beyond the known horizon."),
    gifts: [l("Curiosidad insaciable","Insatiable curiosity"), l("Adaptabilidad","Adaptability"), l("Visión pionera","Pioneering vision"), l("Amor por la diversidad","Love of diversity")],
    shadow: l("La dificultad para comprometerse y echar raíces.", "Difficulty committing and putting down roots."),
    invitation: l("La libertad más profunda se encuentra en el compromiso consciente.", "The deepest freedom is found in conscious commitment."),
    color: "text-accent", bg: "from-violet-50 to-indigo-50",
  },
  amante: {
    name: l("La Amante", "The Lover"),
    title: l("La que conecta con intensidad y pasión", "She who connects with intensity and passion"),
    desc: l("Tu propósito es crear conexión profunda y recordarle al mundo la importancia de la belleza y el amor.", "Your purpose is to create deep connection and remind the world of the importance of beauty and love."),
    gifts: [l("Profundidad emocional","Emotional depth"), l("Sensibilidad estética","Aesthetic sensitivity"), l("Capacidad de conectar","Ability to connect"), l("Pasión transformadora","Transformative passion")],
    shadow: l("La dependencia emocional y el miedo a la pérdida.", "Emotional dependency and fear of loss."),
    invitation: l("Ama desde la plenitud, no desde la necesidad.", "Love from fullness, not from need."),
    color: "text-secondary", bg: "from-rose-50 to-pink-50",
  },
  creadora: {
    name: l("La Creadora", "The Creator"),
    title: l("La que da forma a lo que imagina", "She who gives form to what she imagines"),
    desc: l("Tu propósito es manifestar belleza y originalidad en el mundo. Eres el puente entre la visión y la realidad.", "Your purpose is to manifest beauty and originality in the world. You are the bridge between vision and reality."),
    gifts: [l("Imaginación desbordante","Boundless imagination"), l("Habilidad artística","Artistic skill"), l("Originalidad","Originality"), l("Visión estética única","Unique aesthetic vision")],
    shadow: l("El perfeccionismo que paraliza y la comparación constante.", "Perfectionism that paralyses and constant comparison."),
    invitation: l("Tu imperfección es lo que te hace auténtica e irremplazable.", "Your imperfection is what makes you authentic and irreplaceable."),
    color: "text-accent", bg: "from-indigo-50 to-purple-50",
  },
  guerrera: {
    name: l("La Guerrera", "The Warrior"),
    title: l("La que lucha por lo que importa", "She who fights for what matters"),
    desc: l("Tu propósito es defender causas justas y demostrar que la fuerza y la feminidad coexisten magníficamente.", "Your purpose is to defend just causes and show that strength and femininity coexist magnificently."),
    gifts: [l("Determinación feroz","Fierce determination"), l("Disciplina de acero","Iron discipline"), l("Capacidad estratégica","Strategic capacity"), l("Integridad inquebrantable","Unbreakable integrity")],
    shadow: l("La rigidez y la dificultad para fluir cuando el plan cambia.", "Rigidity and difficulty flowing when the plan changes."),
    invitation: l("La mayor batalla es la que libras dentro de ti misma.", "The greatest battle is the one you fight within yourself."),
    color: "text-primary", bg: "from-red-50 to-orange-50",
  },
  maga: {
    name: l("La Maga", "The Sorceress"),
    title: l("La que transforma la realidad", "She who transforms reality"),
    desc: l("Tu propósito es catalizar transformación. Donde otros ven límites, tú ves posibilidades infinitas.", "Your purpose is to catalyse transformation. Where others see limits, you see infinite possibilities."),
    gifts: [l("Intuición poderosa","Powerful intuition"), l("Capacidad de transformación","Transformative capacity"), l("Visión sistémica","Systemic vision"), l("Carisma magnético","Magnetic charisma")],
    shadow: l("El uso del poder sin discernimiento o con agenda oculta.", "Using power without discernment or with a hidden agenda."),
    invitation: l("Usa tu poder al servicio del bien común, no solo del tuyo.", "Use your power in service of the common good, not only your own."),
    color: "text-secondary", bg: "from-purple-50 to-rose-50",
  },
  inocente: {
    name: l("La Inocente", "The Innocent"),
    title: l("La que mantiene viva la esperanza", "She who keeps hope alive"),
    desc: l("Tu propósito es recordarle al mundo su capacidad innata de felicidad y renovación.", "Your purpose is to remind the world of its innate capacity for happiness and renewal."),
    gifts: [l("Fe inquebrantable","Unbreakable faith"), l("Optimismo contagioso","Contagious optimism"), l("Pureza de intención","Purity of intention"), l("Capacidad de asombro","Capacity for wonder")],
    shadow: l("La ingenuidad que no distingue entre confianza y vulnerabilidad.", "Naivety that doesn't distinguish between trust and vulnerability."),
    invitation: l("La inocencia más poderosa es la que ha conocido el dolor y sigue eligiendo la fe.", "The most powerful innocence is that which has known pain and keeps choosing faith."),
    color: "text-gold", bg: "from-yellow-50 to-green-50",
  },
  sabia: {
    name: l("La Sabia", "The Sage"),
    title: l("La que busca la verdad y el conocimiento", "She who seeks truth and knowledge"),
    desc: l("Tu propósito es comprender el mundo y compartir ese conocimiento para iluminar a otros.", "Your purpose is to understand the world and share that knowledge to illuminate others."),
    gifts: [l("Inteligencia analítica","Analytical intelligence"), l("Objetividad","Objectivity"), l("Amor por el aprendizaje","Love of learning"), l("Claridad de pensamiento","Clarity of thought")],
    shadow: l("El distanciamiento emocional y la arrogancia intelectual.", "Emotional detachment and intellectual arrogance."),
    invitation: l("El conocimiento verdadero incluye el conocimiento del corazón.", "True knowledge includes knowledge of the heart."),
    color: "text-accent", bg: "from-indigo-50 to-cyan-50",
  },
  gobernante: {
    name: l("La Gobernante", "The Ruler"),
    title: l("La que crea orden y liderazgo", "She who creates order and leadership"),
    desc: l("Tu propósito es crear estructuras que sostengan a otros y demostrar que el liderazgo es un acto de servicio.", "Your purpose is to create structures that sustain others and show that leadership is an act of service."),
    gifts: [l("Visión estratégica","Strategic vision"), l("Autoridad natural","Natural authority"), l("Capacidad organizativa","Organisational capacity"), l("Responsabilidad","Responsibility")],
    shadow: l("El control excesivo y la dificultad de delegar.", "Excessive control and difficulty delegating."),
    invitation: l("El verdadero poder se mide por cuánto poder compartes.", "True power is measured by how much power you share."),
    color: "text-gold", bg: "from-amber-50 to-yellow-50",
  },
  bufonesa: {
    name: l("La Bufonesa", "The Jester"),
    title: l("La que libera con humor y juego", "She who liberates through humour and play"),
    desc: l("Tu propósito es liberar tensión, romper paradigmas y recordar que la vida también se vive con alegría.", "Your purpose is to release tension, break paradigms and remind that life is also lived with joy."),
    gifts: [l("Humor inteligente","Intelligent humour"), l("Agilidad mental","Mental agility"), l("Desapego saludable","Healthy detachment"), l("Capacidad de ver lo absurdo","Ability to see the absurd")],
    shadow: l("Usar el humor para evitar la profundidad o la vulnerabilidad.", "Using humour to avoid depth or vulnerability."),
    invitation: l("El juego más profundo es el que se hace con plena presencia.", "The deepest play is done with full presence."),
    color: "text-secondary", bg: "from-pink-50 to-orange-50",
  },
  cuidadora: {
    name: l("La Cuidadora", "The Caregiver"),
    title: l("La que nutre y sostiene con amor", "She who nurtures and sustains with love"),
    desc: l("Tu propósito es crear espacios seguros donde otros puedan crecer, sanar y florecer.", "Your purpose is to create safe spaces where others can grow, heal and flourish."),
    gifts: [l("Empatía profunda","Deep empathy"), l("Generosidad natural","Natural generosity"), l("Presencia sanadora","Healing presence"), l("Amor incondicional","Unconditional love")],
    shadow: l("El abandono de las propias necesidades en el altar del cuidado a otros.", "Abandoning your own needs on the altar of caring for others."),
    invitation: l("Para cuidar bien a otros, primero debes cuidarte profundamente a ti misma.", "To care well for others, you must first care deeply for yourself."),
    color: "text-secondary", bg: "from-rose-50 to-red-50",
  },
});

const getQuestions = (l) => [
  {
    q: l("Cuando enfrentas un desafío grande, tu primer impulso es...", "When you face a big challenge, your first impulse is..."),
    options: [
      { text: l("Atacarlo de frente con toda tu energía", "Attack it head-on with all your energy"), archetypes: ["heroina", "guerrera"] },
      { text: l("Buscar sabiduría en libros o mentoras", "Seek wisdom in books or mentors"), archetypes: ["sabia", "mentora"] },
      { text: l("Intuir la solución que nadie más ve", "Intuit the solution no one else sees"), archetypes: ["maga", "creadora"] },
      { text: l("Conectar con personas que puedan ayudar", "Connect with people who can help"), archetypes: ["amante", "cuidadora"] },
    ],
  },
  {
    q: l("Las personas que te conocen bien dirían que eres...", "People who know you well would say you are..."),
    options: [
      { text: l("Valiente y determinada", "Brave and determined"), archetypes: ["heroina", "guerrera"] },
      { text: l("Libre y curiosa", "Free and curious"), archetypes: ["exploradora", "bufonesa"] },
      { text: l("Profunda y sabia", "Deep and wise"), archetypes: ["sabia", "mentora"] },
      { text: l("Amorosa y generosa", "Loving and generous"), archetypes: ["amante", "cuidadora"] },
    ],
  },
  {
    q: l("Tu mayor satisfacción en la vida viene de...", "Your greatest satisfaction in life comes from..."),
    options: [
      { text: l("Superar lo que creías imposible", "Overcoming what you thought impossible"), archetypes: ["heroina", "gobernante"] },
      { text: l("Crear algo bello y original", "Creating something beautiful and original"), archetypes: ["creadora", "amante"] },
      { text: l("Transformar la vida de otras personas", "Transforming other people's lives"), archetypes: ["maga", "mentora"] },
      { text: l("Explorar territorios desconocidos", "Exploring unknown territories"), archetypes: ["exploradora", "bufonesa"] },
    ],
  },
  {
    q: l("En tu negocio, lo que más te energiza es...", "In your business, what energises you most is..."),
    options: [
      { text: l("Liderar y tomar decisiones estratégicas", "Leading and making strategic decisions"), archetypes: ["gobernante", "guerrera"] },
      { text: l("Crear contenido y expresarte creativamente", "Creating content and expressing yourself creatively"), archetypes: ["creadora", "inocente"] },
      { text: l("Conectar con tus clientes a un nivel profundo", "Connecting with clients at a deep level"), archetypes: ["amante", "cuidadora"] },
      { text: l("Descubrir y aplicar nuevas herramientas", "Discovering and applying new tools"), archetypes: ["maga", "exploradora"] },
    ],
  },
  {
    q: l("Cuando otros te buscan, generalmente es porque...", "When others seek you out, it's usually because..."),
    options: [
      { text: l("Necesitan consejo y orientación", "They need advice and guidance"), archetypes: ["mentora", "sabia"] },
      { text: l("Quieren que los inspires y motives", "They want you to inspire and motivate them"), archetypes: ["heroina", "inocente"] },
      { text: l("Buscan que resuelvas algo difícil", "They want you to solve something difficult"), archetypes: ["maga", "guerrera"] },
      { text: l("Quieren sentirse escuchadas y cuidadas", "They want to feel heard and cared for"), archetypes: ["cuidadora", "amante"] },
    ],
  },
  {
    q: l("Tu mayor fortaleza en situaciones difíciles es...", "Your greatest strength in difficult situations is..."),
    options: [
      { text: l("No rendirme nunca", "Never giving up"), archetypes: ["heroina", "guerrera"] },
      { text: l("Ver ángulos que otros no ven", "Seeing angles others don't see"), archetypes: ["maga", "sabia"] },
      { text: l("Mantener la calma y el orden", "Maintaining calm and order"), archetypes: ["gobernante", "cuidadora"] },
      { text: l("Traer humor y ligereza", "Bringing humour and lightness"), archetypes: ["bufonesa", "inocente"] },
    ],
  },
  {
    q: l("Si pudieras dedicar tu vida a una sola causa, sería...", "If you could dedicate your life to one cause, it would be..."),
    options: [
      { text: l("Demostrar que las mujeres podemos lograr cualquier cosa", "Showing that women can achieve anything"), archetypes: ["heroina", "guerrera"] },
      { text: l("Compartir conocimiento que transforme a las personas", "Sharing knowledge that transforms people"), archetypes: ["mentora", "sabia"] },
      { text: l("Crear belleza que emocione al mundo", "Creating beauty that moves the world"), archetypes: ["creadora", "amante"] },
      { text: l("Cuidar y sanar a quienes más lo necesitan", "Caring for and healing those who need it most"), archetypes: ["cuidadora", "inocente"] },
    ],
  },
  {
    q: l("Lo que más temes perder es...", "What you fear losing most is..."),
    options: [
      { text: l("Tu independencia y libertad", "Your independence and freedom"), archetypes: ["exploradora", "gobernante"] },
      { text: l("Las personas que amas", "The people you love"), archetypes: ["amante", "cuidadora"] },
      { text: l("Tu propósito y dirección", "Your purpose and direction"), archetypes: ["heroina", "maga"] },
      { text: l("Tu creatividad e identidad", "Your creativity and identity"), archetypes: ["creadora", "bufonesa"] },
    ],
  },
  {
    q: l("Cuando celebras un logro, lo primero que haces es...", "When you celebrate an achievement, the first thing you do is..."),
    options: [
      { text: l("Compartirlo con las personas que te importan", "Share it with the people who matter to you"), archetypes: ["amante", "mentora"] },
      { text: l("Anotar lo aprendido y planear el próximo nivel", "Note what was learned and plan the next level"), archetypes: ["sabia", "gobernante"] },
      { text: l("Sentir gratitud profunda y silenciosa", "Feel deep and quiet gratitude"), archetypes: ["inocente", "cuidadora"] },
      { text: l("Celebrar con toda la intensidad del momento", "Celebrate with the full intensity of the moment"), archetypes: ["heroina", "bufonesa"] },
    ],
  },
  {
    q: l("La frase que mejor te describe es...", "The phrase that best describes you is..."),
    options: [
      { text: l("Donde hay una voluntad, hay un camino", "Where there is a will, there is a way"), archetypes: ["heroina", "guerrera"] },
      { text: l("El conocimiento es el mayor poder", "Knowledge is the greatest power"), archetypes: ["sabia", "mentora"] },
      { text: l("La vida es un milagro que se merece ser celebrado", "Life is a miracle worth celebrating"), archetypes: ["inocente", "bufonesa"] },
      { text: l("La transformación comienza en el interior", "Transformation begins within"), archetypes: ["maga", "creadora"] },
    ],
  },
];

export default function ArquetipoApp() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;
  const archetypes = getArchetypes(l);
  const questions = getQuestions(l);

  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (archetypeKeys) => {
    const newScores = { ...scores };
    archetypeKeys.forEach((k) => { newScores[k] = (newScores[k] || 0) + 1; });
    setScores(newScores);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  };

  const reset = () => { setCurrent(0); setScores({}); setResult(null); };
  const progress = (current / questions.length) * 100;
  const arch = result ? archetypes[result ] : null;

  if (result && arch) {
    return (
      React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14 max-w-2xl mx-auto"     , 'data-testid': "arquetipo-result", __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}
        , React.createElement('div', { className: `rounded-3xl border border-card-border bg-gradient-to-br ${arch.bg} p-10 text-center`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
          , React.createElement('p', { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}
            , l("Tu Arquetipo Dominante", "Your Dominant Archetype")
          )
          , React.createElement('h1', { className: `font-serif text-5xl font-light mb-2 ${arch.color}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}, arch.name)
          , React.createElement('p', { className: "text-muted-foreground mb-8 font-serif italic text-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}, arch.title)
          , React.createElement('p', { className: "text-foreground/85 leading-relaxed mb-10"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}, arch.desc)
          , React.createElement('div', { className: "text-left space-y-6 mb-10"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 249}}
              , React.createElement('h3', { className: "text-sm uppercase tracking-wider text-muted-foreground mb-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}
                , l("Tus Dones", "Your Gifts")
              )
              , React.createElement('div', { className: "flex flex-wrap gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}}
                , arch.gifts.map((g) => (
                  React.createElement('span', { key: g, className: `text-sm border rounded-full px-3 py-1 ${arch.color} border-current/30 bg-current/10`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 255}}, g)
                ))
              )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 259}}
              , React.createElement('h3', { className: "text-sm uppercase tracking-wider text-muted-foreground mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}
                , l("Tu Sombra", "Your Shadow")
              )
              , React.createElement('p', { className: "text-sm text-muted-foreground italic"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 263}}, arch.shadow)
            )
            , React.createElement('div', { className: "border border-card-border rounded-xl p-5 bg-card/50"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}}
              , React.createElement('h3', { className: "text-sm uppercase tracking-wider text-muted-foreground mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 266}}
                , l("Tu Invitación", "Your Invitation")
              )
              , React.createElement('p', { className: "font-serif text-lg italic text-foreground/90"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 269}}, arch.invitation)
            )
          )
          , React.createElement(Button, { onClick: reset, variant: "outline", className: "gap-2", 'data-testid': "btn-reset-quiz", __self: this, __source: {fileName: _jsxFileName, lineNumber: 272}}
            , React.createElement(RotateCcw, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 273}} ), " " , l("Repetir el Quiz", "Retake the Quiz")
          )
        )
      )
    );
  }

  const q = questions[current];
  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14 max-w-2xl mx-auto"     , 'data-testid': "arquetipo-quiz", __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
      , React.createElement(SectionUpload, { route: "/proposito/arquetipo" })
      , React.createElement('div', { className: "mb-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 284}}
          , l("Pregunta", "Question"), " " , current + 1, " " , l("de", "of"), " " , questions.length
        )
        , React.createElement(Progress, { value: progress, className: "h-1 mb-8" , 'data-testid': "quiz-progress", __self: this, __source: {fileName: _jsxFileName, lineNumber: 287}} )
        , React.createElement('h2', { className: "font-serif text-3xl font-light leading-snug"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 288}}, q.q)
      )
      , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 290}}
        , q.options.map((opt, i) => (
          React.createElement('button', {
            key: i,
            onClick: () => handleAnswer(opt.archetypes),
            className: "w-full text-left rounded-xl border border-card-border bg-card hover:border-primary/40 hover:bg-primary/5 p-5 transition-all duration-200 group"           ,
            'data-testid': `quiz-option-${i}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 292}}

            , React.createElement('span', { className: "text-foreground/85 group-hover:text-foreground transition-colors"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 298}}, opt.text)
          )
        ))
      )
      , current > 0 && (
        React.createElement('button', {
          onClick: () => setCurrent(current - 1),
          className: "mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"       ,
          'data-testid': "btn-prev-question", __self: this, __source: {fileName: _jsxFileName, lineNumber: 303}}

          , React.createElement(ArrowLeft, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 308}} ), " " , l("Pregunta anterior", "Previous question")
        )
      )
    )
  );
}
