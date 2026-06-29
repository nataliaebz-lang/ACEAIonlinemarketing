import * as React from "react";
const _jsxFileName = ""; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState } from "react";
import { Copy, Check, Search, Zap, BookOpen, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language";












const LEVEL_META = {
  basico: {
    labelEs: "Básico",
    labelEn: "Basic",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
    icon: BookOpen,
  },
  intermedio: {
    labelEs: "Intermedio",
    labelEn: "Intermediate",
    color: "text-accent bg-accent/10 border-accent/25",
    dot: "bg-accent",
    icon: Zap,
  },
  avanzado: {
    labelEs: "Avanzado",
    labelEn: "Advanced",
    color: "text-primary bg-primary/10 border-primary/25",
    dot: "bg-primary",
    icon: Sparkles,
  },
};

export default function PromptsLibrary() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  const prompts = [
    /* ── BÁSICO · Estructuras de Prompt ─────────────────────────────── */
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Formato Básico Universal", titleEn: "Universal Basic Format", prompt: "Act as a [ROLE]. I want you to [TASK]. The context is [CONTEXT]. Please output it in [FORMAT]. The tone should be [TONE].\n\nEjemplo: Act as a productivity coach. I want you to create a weekly time-blocking schedule for a busy entrepreneur. The context is a solo founder working from home. Please output it as a daily schedule with time ranges. The tone should be supportive and realistic." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Job-to-be-Done", titleEn: "Job-to-be-Done", prompt: "I need help with [PROBLEM/GOAL]. You are a [ROLE/EXPERT]. Based on [CONTEXT], provide [OUTPUT FORMAT] that will help me achieve [RESULT].\n\nEjemplo: I need help with generating leads. You are a marketing strategist. Based on a coaching business that operates online, provide a 3-step funnel that will help me get 100 new leads in 30 days." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Orientado a Resultados", titleEn: "Outcome-Oriented", prompt: "Generate a [FORMAT] that helps [AUDIENCE] accomplish [GOAL], using insights from [CONTEXT]. Make sure the tone is [TONE].\n\nEjemplo: Generate a step-by-step guide that helps new entrepreneurs build their first digital product, using insights from successful course creators. Make sure the tone is practical and encouraging." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Instructivo por Nivel", titleEn: "Instructional by Level", prompt: "Teach me how to [TASK] as if I were a [LEVEL OF EXPERTISE]. Assume [CONTEXT], and format the response as [FORMAT]. Use a [TONE] tone.\n\nEjemplo: Teach me how to create a high-converting webinar as if I were a beginner. Assume I have a business coaching program, and format the response as a checklist. Use a friendly tone." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Comparar y Decidir", titleEn: "Compare & Decide", prompt: "Give me [#] options for [TOPIC/CHOICE], each with pros and cons. Assume the context is [CONTEXT]. Output in a [FORMAT], with a [TONE] tone.\n\nEjemplo: Give me 3 options for AI-powered email automation tools, each with pros and cons. Assume the context is a small e-commerce store. Output in a table format with a clear recommendation." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Critica y Mejora", titleEn: "Critique & Improve", prompt: "Here's [EXISTING WORK or IDEA]. As a [ROLE], critique it based on [GOALS/CRITERIA] and suggest improvements in [FORMAT]. Keep the tone [TONE].\n\nEjemplo: Here's my product description: 'This tool helps you save time using automation.' As a conversion copywriter, critique it based on clarity and emotional appeal and suggest improvements." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Guía Paso a Paso", titleEn: "Step-by-Step Guide", prompt: "Break down how to [GOAL] into actionable steps. The audience is [AUDIENCE] and the context is [CONTEXT]. Output in [FORMAT] with a [TONE] tone.\n\nEjemplo: Break down how to create a podcast from scratch into actionable steps. The audience is solopreneurs and the context is a personal branding strategy. Output in a checklist format." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Generador de Framework", titleEn: "Framework Generator", prompt: "Create a [#]-part framework for [TOPIC/GOAL]. The context is [INDUSTRY/AUDIENCE]. Include names, explanations, and a [TONE] tone in the output.\n\nEjemplo: Create a 4-part framework for building a personal brand on LinkedIn. The context is job-seeking professionals in the tech industry. Include names, explanations, and an inspiring tone." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Simulación de Escenario", titleEn: "Scenario Simulation", prompt: "Simulate a [SCENARIO] between [PARTIES/ROLES]. The goal is to [GOAL]. Structure it as a [FORMAT], and use a [TONE] tone.\n\nEjemplo: Simulate a negotiation between a startup founder and a potential investor. The goal is to secure funding while retaining equity. Structure it as a script and use a professional tone." },
    { level: "basico", categoryEs: "Estructura Básica", categoryEn: "Basic Structure", titleEs: "Expansión Creativa", titleEn: "Creative Expansion", prompt: "Start with this idea: [IDEA]. As a [ROLE], expand it into [FORMAT] that suits [CONTEXT]. Keep the tone [TONE].\n\nEjemplo: Start with this idea: 'mindful productivity.' As a content strategist, expand it into a blog outline that suits a wellness brand's audience. Keep the tone calm and focused." },

    /* ── BÁSICO · Marketing ──────────────────────────────────────────── */
    { level: "basico", categoryEs: "Copywriting", categoryEn: "Copywriting", titleEs: "Sales Page Completa", titleEn: "Complete Sales Page", prompt: "Actúa como un experto copywriter especializado en marketing para mujeres emprendedoras. Escribe una sales page completa para [PRODUCTO] dirigida a [AUDIENCIA]. Incluye: titular principal que genera curiosidad, subtítulo que amplía el beneficio, historia emocional de transformación, 5 bullets de beneficios con prueba, manejo de las 3 principales objeciones, llamada a la acción poderosa. Tono: [TONO]. Precio: [PRECIO]." },
    { level: "basico", categoryEs: "Copywriting", categoryEn: "Copywriting", titleEs: "Caption de Instagram que Vende", titleEn: "Instagram Caption that Sells", prompt: "Escribe 3 versiones de caption para Instagram para promocionar [PRODUCTO/SERVICIO]. Para cada versión usa un gancho diferente: 1) pregunta provocadora, 2) dato sorprendente, 3) historia personal. Cada caption debe incluir beneficio principal, prueba social y CTA. Máximo 150 palabras por caption. Emojis: ninguno." },
    { level: "basico", categoryEs: "Copywriting", categoryEn: "Copywriting", titleEs: "Testimonial Reescrito", titleEn: "Rewritten Testimonial", prompt: "Tengo este testimonio de cliente: [TESTIMONIO]. Reescríbelo para maximizar su impacto en ventas manteniendo la autenticidad. Resalta: la situación antes, la transformación específica, los resultados concretos con números si los hay, y la emoción del cambio. Mantén la voz natural del cliente." },
    { level: "basico", categoryEs: "Copywriting", categoryEn: "Copywriting", titleEs: "Bio de Impacto", titleEn: "Impact Bio", prompt: "Escribe 3 versiones de bio profesional para [NOMBRE]: especialista en [ESPECIALIDAD] que ayuda a [AUDIENCIA] a [TRANSFORMACIÓN]. Versión 1: Instagram (150 chars). Versión 2: LinkedIn (300 words, primera persona). Versión 3: Presentación en vivo (30 segundos hablados). Tono: experta y cercana, no corporativa." },
    { level: "basico", categoryEs: "Copywriting", categoryEn: "Copywriting", titleEs: "Headline Magnético", titleEn: "Magnetic Headline", prompt: "Genera 15 titulares para [TEMA/PRODUCTO] usando estas fórmulas: 5 con número + beneficio + tiempo, 5 con pregunta + problema, 5 con contraste antes/después. El público objetivo es [AUDIENCIA]. El principal pain point es [DOLOR]. El beneficio central es [BENEFICIO]. Ordena de mayor a menor impacto probable." },
    { level: "basico", categoryEs: "Redes Sociales", categoryEn: "Social Media", titleEs: "Plan de Contenido Mensual", titleEn: "Monthly Content Plan", prompt: "Crea un plan de contenido de 30 días para [NEGOCIO/NICHO] en Instagram. Mezcla de contenido: 40% educativo, 30% entretenimiento/relatable, 20% ventas, 10% comunidad. Para cada día incluye: tipo de formato (reel/carrusel/fija/stories), tema, gancho principal, objetivo (alcance/conversión/engagement). Incluye 4 ideas de reel viral para el mes." },
    { level: "basico", categoryEs: "Redes Sociales", categoryEn: "Social Media", titleEs: "Guion de Reel 60 Segundos", titleEn: "60-Second Reel Script", prompt: "Escribe el guion completo para un reel de 60 segundos sobre [TEMA]. Estructura: 0-3s gancho visual y verbal, 3-15s contexto del problema, 15-50s solución en pasos numerados, 50-60s CTA con urgencia. Cada escena describe: lo que se dice, lo que se ve, texto en pantalla. El público es [AUDIENCIA]." },
    { level: "basico", categoryEs: "Redes Sociales", categoryEn: "Social Media", titleEs: "Ideas de Carrusel Viral", titleEn: "Viral Carousel Ideas", prompt: "Genera 10 ideas de carrusel educativo para [NICHO] que tengan potencial viral por guardados y compartidos. Para cada idea incluye: título del carrusel (máximo 7 palabras), número de slides propuesto, estructura del contenido slide por slide, por qué la gente lo guardaría. Enfócate en listas, errores comunes y comparaciones." },
    { level: "basico", categoryEs: "Email Marketing", categoryEn: "Email Marketing", titleEs: "Secuencia de Bienvenida (5 Emails)", titleEn: "Welcome Sequence (5 Emails)", prompt: "Escribe una secuencia de bienvenida de 5 emails para [NEGOCIO] para personas que se suscriben a [LEAD MAGNET]. Email 1 (inmediato): entrega del lead magnet + historia personal. Email 2 (día 2): el problema que resuelves. Email 3 (día 4): contenido de valor puro. Email 4 (día 6): caso de éxito de cliente. Email 5 (día 8): primera oferta suave. Tono: cercano, sin humo." },
    { level: "basico", categoryEs: "Email Marketing", categoryEn: "Email Marketing", titleEs: "Email de Ventas con Urgencia", titleEn: "Urgency Sales Email", prompt: "Escribe un email de ventas para [PRODUCTO] que se cierra en 48 horas. Estructura: asunto que genera apertura, historia de apertura (2 párrafos), transición al producto, 3 bullets de beneficios transformacionales (no features), precio y lo que incluye, urgencia real (no artificial), PS poderoso. Precio: [PRECIO]. Audiencia: [AUDIENCIA]." },
    { level: "basico", categoryEs: "Email Marketing", categoryEn: "Email Marketing", titleEs: "Email de Reactivación", titleEn: "Re-engagement Email", prompt: "Escribe un email de reactivación para suscriptores inactivos de [NEGOCIO] que no han abierto en 90+ días. El objetivo es que vuelvan a conectar o que se den de baja limpiamente. Incluye: asunto provocador, reconocimiento de su inactividad con humor, recordatorio de lo que se están perdiendo, oferta de valor exclusiva para reactivados. Tono: directo y honesto." },
    { level: "basico", categoryEs: "Estrategia de Contenido", categoryEn: "Content Strategy", titleEs: "Pilares de Contenido", titleEn: "Content Pillars", prompt: "Soy [ROL] que ayuda a [AUDIENCIA] a [TRANSFORMACIÓN]. Mi producto/servicio principal es [PRODUCTO]. Define mis 5 pilares de contenido ideales para Instagram. Para cada pilar: nombre del pilar, qué tipo de contenido incluye, por qué es relevante para mi audiencia, 3 ideas de posts concretos, cómo conecta con mis ventas." },
    { level: "basico", categoryEs: "Branding Personal", categoryEn: "Personal Branding", titleEs: "Declaración de Posicionamiento", titleEn: "Positioning Statement", prompt: "Ayúdame a crear mi declaración de posicionamiento único. Soy [NOMBRE], especialista en [ESPECIALIDAD]. Mi audiencia es [AUDIENCIA ESPECÍFICA]. Los ayudo a pasar de [SITUACIÓN ACTUAL] a [SITUACIÓN DESEADA]. Mi metodología única es [MÉTODO]. Mi diferenciador es [POR QUÉ YO]. Genera 5 versiones: 1 línea, 2 líneas, párrafo corto, párrafo largo, manifiesto." },
    { level: "basico", categoryEs: "Branding Personal", categoryEn: "Personal Branding", titleEs: "Historia de Marca", titleEn: "Brand Story", prompt: "Ayúdame a escribir mi historia de marca para [NEGOCIO]. Información clave: quién era yo antes, cuál fue el punto de quiebre, qué descubrí, cómo transformé mi vida/negocio, a quién ayudo ahora y cómo. Escribe 3 versiones: versión larga para about page (400 palabras), versión media para bio de Instagram (100 palabras), versión ultra corta para presentaciones (2 frases)." },
    { level: "basico", categoryEs: "SEO", categoryEn: "SEO", titleEs: "Estrategia SEO para Blog", titleEn: "Blog SEO Strategy", prompt: "Actúa como experta en SEO para negocios de [NICHO]. Genera un plan de 12 artículos de blog para posicionar en Google. Para cada artículo: keyword principal (volumen estimado y dificultad), título SEO-optimizado, estructura H2/H3, intención de búsqueda, por qué convierte a cliente. Enfócate en keywords de cola larga con intención comercial." },
    { level: "basico", categoryEs: "SEO", categoryEn: "SEO", titleEs: "Artículo Completo SEO", titleEn: "Full SEO Article", prompt: "Escribe un artículo de blog de 1500 palabras optimizado para SEO sobre '[KEYWORD PRINCIPAL]'. Incluye la keyword en: título, primer párrafo, al menos 3 H2, meta description. Estructura: introducción con gancho, 5 secciones principales con H2, conclusión con CTA. Audiencia: [AUDIENCIA]. Nivel: [PRINCIPIANTE/INTERMEDIO/AVANZADO]." },
    { level: "basico", categoryEs: "Ventas", categoryEn: "Sales", titleEs: "Propuesta de Ventas 1:1", titleEn: "1:1 Sales Proposal", prompt: "Escribe un guion de conversación de ventas 1:1 para vender [SERVICIO/PROGRAMA] de [PRECIO]. El formato es llamada de diagnóstico de 30-45 minutos. Incluye: apertura y rapport, preguntas de diagnóstico (8-10 preguntas), transición a la presentación, presentación del programa, manejo de las 3 objeciones más comunes (precio, tiempo, decisión), cierre suave. Tono: consultivo, no de vendedora." },
    { level: "basico", categoryEs: "Ventas", categoryEn: "Sales", titleEs: "Respuesta a Objeción de Precio", titleEn: "Price Objection Response", prompt: "El prospecto dice: 'Es muy caro para mí ahora mismo'. Escribe 5 respuestas diferentes para manejar esta objeción de forma honesta y no manipuladora para [PRODUCTO/SERVICIO]. Cada respuesta debe: validar la preocupación, reencuadrar el valor, ofrecer perspectiva, y dar una salida elegante si realmente no es el momento. No uses presión ni urgencia artificial." },

    /* ── INTERMEDIO · Técnicas de Ingeniería de Prompts ─────────────── */
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Meta Prompt (System Prompt)", titleEn: "Meta Prompt (System Prompt)", prompt: "You are a [ROLE]. Your job is to always [BEHAVIOR RULE] unless told otherwise.\n\nDefinición: Instrucción de alto nivel que define el rol y comportamiento de la IA durante toda la sesión.\n\nEjemplo: You are an empathetic career coach. Your job is to offer motivational and strategic advice in all responses, always asking clarifying questions before giving recommendations." },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Prompt de Secuenciación", titleEn: "Engineered Prompt (Sequencing)", prompt: "Step 1: [FIRST TASK]\nStep 2: [SECOND TASK]\nStep 3: [THIRD TASK]\n\nDefinición: Divide tareas complejas en secuencias estructuradas para guiar al modelo lógicamente.\n\nEjemplo:\nStep 1: Identify the user's niche and main pain point.\nStep 2: List three content angles that address that pain.\nStep 3: Recommend a 30-day content theme based on the angles." },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Encadenamiento de Prompts", titleEn: "Prompt Chaining (Output → Input)", prompt: "Take the output above and use it to [NEXT TASK].\n\nDefinición: Usa el resultado de un prompt como input del siguiente para construir lógica compleja o resultados refinados.\n\nEjemplo: Paso 1 — 'Generate 10 hook ideas for a reel about productivity for mompreneurs.' Paso 2 — 'Take the hook list above and turn each one into a full 60-second reel script.'" },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Contextualización de Datos", titleEn: "Prompt Contexting (Data)", prompt: "Based on the following data: [CONTEXT], generate [TASK].\n\nDefinición: Proporciona datos, hechos o contexto específico para personalizar la respuesta con precisión.\n\nEjemplo: Based on the following data: 'My business is a 1:1 coaching practice, 6 months old, 8 clients, average ticket £1,200, audience is women 35–50 in career transition' — generate a 3-sentence personal brand statement and a content strategy for LinkedIn." },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Prompt Negativo (Exclusión)", titleEn: "Negative Prompting (Exclusion)", prompt: "Do not include [UNWANTED CONTENT] in your response.\n\nDefinición: Le dices al modelo lo que NO debe hacer para reducir outputs irrelevantes o de baja calidad.\n\nEjemplo: Write a LinkedIn post about AI for entrepreneurs. Do not include: buzzwords like 'game-changer' or 'revolutionary', generic advice, numbered lists, more than 3 paragraphs, or any mention of ChatGPT by name." },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Prompt Generativo (Promptless)", titleEn: "Promptless Prompt (Generative)", prompt: "Create a prompt for me to [OUTPUT WANTED].\n\nDefinición: Deja que el modelo genere su propio prompt con dirección mínima para explorar creatividad.\n\nEjemplo: 'Create the ideal prompt for me to use with you to generate a compelling pitch deck narrative for a SaaS tool targeting female entrepreneurs in the UK.'" },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "A/B de Prompts", titleEn: "Automatic Prompting (A/B Test)", prompt: "Try [#] different ways to ask for [TASK] to see which yields the clearest result.\n\nDefinición: Corre múltiples versiones de un prompt para ver cuál rinde mejor (A/B testing de lenguaje).\n\nEjemplo: Try 3 different versions of this prompt: 'Write a sales email for my coaching programme.' Vary the framing (problem-led, transformation-led, curiosity-led) and note which produces the most compelling result." },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Refinamiento de Prompt", titleEn: "Prompt Finetuning (Refining)", prompt: "Refine the original prompt to be more [SPECIFIC/ENGAGING/CONCISE/EMOTIONAL].\n\nDefinición: Revisa y optimiza un prompt después de ver los resultados iniciales.\n\nEjemplo: Original prompt: 'Write about AI for business.' Refined: 'Write a 200-word Instagram caption for a female entrepreneur aged 38–55 who feels overwhelmed by tech, showing her how one AI tool saved me 5 hours last week. Tone: warm, peer-to-peer, no jargon.'" },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Iteración de Formato (Modality)", titleEn: "Prompt Iteration (Modality)", prompt: "Convert this [FORMAT TYPE] into a [NEW FORMAT TYPE] that achieves [GOAL].\n\nDefinición: Usa diferentes formas de input (texto, tablas, código, etc.) para mejorar la efectividad del prompt.\n\nEjemplos:\n• Convert this bullet list of product features into a benefit-led paragraph for a sales page.\n• Convert this transcript into a structured FAQ document.\n• Convert this table of data into a compelling story for a pitch deck." },
    { level: "intermedio", categoryEs: "Técnicas Intermedias", categoryEn: "Intermediate Techniques", titleEs: "Markdown vs XML", titleEn: "Markdown vs XML Output", prompt: "Return the output in [Markdown/XML] format including [ELEMENTS].\n\nDefinición: Elige el formato de marcado apropiado para estructurar la respuesta (Markdown para legibilidad, XML para procesamiento).\n\nEjemplo Markdown: 'Return the content strategy in Markdown format with ## headers for each pillar, bullet points for post ideas, and **bold** for CTAs.'\n\nEjemplo XML: 'Return the product catalogue in XML format with <product>, <name>, <price>, and <description> tags for each item.'" },

    /* ── AVANZADO · Técnicas Avanzadas ──────────────────────────────── */
    { level: "avanzado", categoryEs: "Técnicas Avanzadas", categoryEn: "Advanced Techniques", titleEs: "Zero-Shot Prompting", titleEn: "Zero-Shot Prompting", prompt: "Role: You are a [ROLE] with [X] years of [FIELD] experience.\nTask: [SPECIFIC TASK WITH CLEAR DELIVERABLE].\nTone: [TONE], [STYLE DESCRIPTOR], [CONSTRAINT].\nAudience: [TARGET AUDIENCE].\n\nDefinición: No requiere ejemplos — el modelo se basa en instrucciones precisas, framing de rol y señales estructurales para generar el output correcto.\n\nEjemplo real:\nRole: You are a senior B2B content strategist with 15 years of SaaS experience.\nTask: Write a 3-paragraph LinkedIn post announcing our new AI reporting feature.\nTone: Confident, benefit-led, no jargon.\nAudience: Mid-market operations directors." },
    { level: "avanzado", categoryEs: "Técnicas Avanzadas", categoryEn: "Advanced Techniques", titleEs: "Few-Shot Prompting (ICL)", titleEn: "Few-Shot Prompting (In-Context Learning)", prompt: "You are an expert in [FIELD]. Below are [#] examples of [OUTPUT TYPE]:\n\n1. [EXAMPLE 1]\n2. [EXAMPLE 2]\n3. [EXAMPLE 3]\n\nBased on these examples, [TASK]. Maintain the same [TONE/STYLE/FORMAT] and focus on [KEY ELEMENTS].\n\nDefinición: Proporciona ejemplos del output ideal antes de la solicitud real para que el modelo aprenda el patrón. Mejora significativamente la calidad al mostrar qué aspecto tiene un resultado 'bueno'." },
    { level: "avanzado", categoryEs: "Técnicas Avanzadas", categoryEn: "Advanced Techniques", titleEs: "Chain-of-Thought (CoT)", titleEn: "Chain-of-Thought (CoT) Prompting", prompt: "Let's read the question step by step and understand each sentence again with the sentences after it. Then refer to the corresponding steps when answering: [COMPLEX QUESTION OR TASK].\n\nDefinición: Genera un proceso de razonamiento paso a paso (Step-by-Step Reasoning) para forzar el análisis semántico profundo. Ideal para problemas complejos, análisis de negocio, decisiones estratégicas o cualquier tarea que requiera lógica encadenada.\n\nEjemplo: 'Should I launch a group programme or a 1:1 offer first? Let's think through this step by step, considering my current audience size, revenue goals, delivery capacity, and market positioning.'" },
    { level: "avanzado", categoryEs: "Técnicas Avanzadas", categoryEn: "Advanced Techniques", titleEs: "Tree-of-Thought (ToT)", titleEn: "Tree-of-Thought (ToT) Prompting", prompt: "Imagine three different experts having a conversation about [TOPIC/PROBLEM]. Each expert proposes their best approach. If any expert realizes at any point that their reasoning is flawed or suboptimal, they exit the conversation. The remaining experts continue refining until the best solution emerges.\n\nDefinición: Explora múltiples caminos de razonamiento en forma ramificada (árbol). Útil para decisiones estratégicas complejas donde múltiples perspectivas añaden valor.\n\nConsejo en ChatGPT: Usa 'Branch in a new chat 🔀' para explorar caminos paralelos." },
    { level: "avanzado", categoryEs: "Técnicas Avanzadas", categoryEn: "Advanced Techniques", titleEs: "Self-Consistency (Ensemble)", titleEn: "Self-Consistency (Ensemble) Prompting", prompt: "Generate [#] different answers to the following question, each using a different reasoning approach or angle. After generating all answers, identify the consensus or aggregate the best elements from each: [QUESTION OR TASK].\n\nDefinición: Genera múltiples respuestas para la misma consulta y elige la respuesta de 'consenso' agregada. Aumenta la fiabilidad y reduce sesgos al combinar perspectivas.\n\nConsejo en ChatGPT: Usa 'Try again 🔄' para regenerar y comparar. Luego pide al modelo que sintetice las mejores respuestas." },
    { level: "avanzado", categoryEs: "Técnicas Avanzadas", categoryEn: "Advanced Techniques", titleEs: "Reflective Prompting", titleEn: "Reflective Prompting (Re-checking & Refinement)", prompt: "Check the above answer for errors, gaps, or missing information and correct them. Specifically evaluate: [CRITERIA 1], [CRITERIA 2], [CRITERIA 3]. Then provide an improved version.\n\nDefinición: Hace que el modelo reflexione sobre o critique su propia respuesta antes de entregar la versión final. Poderoso para copy, estrategia y cualquier output de alto valor donde la precisión importa.\n\nEjemplo: 'Review the sales email above. Check for: emotional resonance, clarity of the offer, strength of the CTA, and any claims that could feel pushy. Then rewrite the improved version.'" },
    { level: "avanzado", categoryEs: "Técnicas Avanzadas", categoryEn: "Advanced Techniques", titleEs: "Verbalized Sampling", titleEn: "Verbalized Sampling", prompt: "Generate [#] diverse answers to the following request, each with a different creative direction or interpretation. For each answer, briefly note the angle or probability that this version would resonate best with [AUDIENCE]: [TASK].\n\nDefinición: El modelo genera múltiples respuestas diversas junto con sus probabilidades de éxito, aumentando la creatividad sin necesidad de reentrenamiento.\n\nEjemplo: 'Generate 5 different email subject lines for a webinar about AI for coaches, each using a different psychological trigger (curiosity, fear of missing out, social proof, authority, transformation). For each, note the estimated open rate probability and why.'" },
  ];

  const levelKeys = [
    { key: "todos",      labelEs: "Todos",       labelEn: "All" },
    { key: "basico",     labelEs: "Básico",      labelEn: "Basic" },
    { key: "intermedio", labelEs: "Intermedio",  labelEn: "Intermediate" },
    { key: "avanzado",   labelEs: "Avanzado",    labelEn: "Advanced" },
  ];

  const categoryKeys = [
    { es: "Todos", en: "All" },
    { es: "Estructura Básica", en: "Basic Structure" },
    { es: "Copywriting", en: "Copywriting" },
    { es: "Redes Sociales", en: "Social Media" },
    { es: "Email Marketing", en: "Email Marketing" },
    { es: "Estrategia de Contenido", en: "Content Strategy" },
    { es: "Branding Personal", en: "Personal Branding" },
    { es: "SEO", en: "SEO" },
    { es: "Ventas", en: "Sales" },
    { es: "Técnicas Intermedias", en: "Intermediate Techniques" },
    { es: "Técnicas Avanzadas", en: "Advanced Techniques" },
  ];

  const [activeLevel, setActiveLevel]       = useState("todos");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch]                 = useState("");
  const [copied, setCopied]                 = useState(null);

  const allLabel   = lang === "es" ? "Todos" : "All";
  const categories = categoryKeys.map((c) => lang === "es" ? c.es : c.en);

  const filtered = prompts.filter((p) => {
    const pCat    = lang === "es" ? p.categoryEs : p.categoryEn;
    const pTitle  = lang === "es" ? p.titleEs : p.titleEn;
    const matchLv = activeLevel === "todos" || p.level === activeLevel;
    const matchCt = activeCategory === allLabel || pCat === activeCategory;
    const matchSr = !search || pTitle.toLowerCase().includes(search.toLowerCase()) || p.prompt.toLowerCase().includes(search.toLowerCase());
    return matchLv && matchCt && matchSr;
  });

  const handleCopy = (prompt, id) => {
    navigator.clipboard.writeText(prompt);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const levelCounts = {
    todos:      prompts.length,
    basico:     prompts.filter((p) => p.level === "basico").length,
    intermedio: prompts.filter((p) => p.level === "intermedio").length,
    avanzado:   prompts.filter((p) => p.level === "avanzado").length,
  };

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "prompts-library", __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}
      /* Header */
      , React.createElement('div', { className: "mb-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-accent mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}, l("IA · Recursos", "AI · Resources"))
        , React.createElement('h1', { className: "font-serif text-4xl font-light mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}, l("Biblioteca de Prompts", "Prompt Library"))
        , React.createElement('p', { className: "text-muted-foreground max-w-lg mb-8"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
          , prompts.length, "+ " , l("prompts en 3 niveles: desde estructuras básicas hasta ingeniería avanzada.", "prompts across 3 levels: from basic structures to advanced engineering.")
        )

        /* Level tabs */
        , React.createElement('div', { className: "flex gap-2 mb-6 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
          , levelKeys.map(({ key, labelEs, labelEn }) => {
            const label = lang === "es" ? labelEs : labelEn;
            const meta  = key !== "todos" ? LEVEL_META[key] : null;
            const Icon  = _optionalChain([meta, 'optionalAccess', _ => _.icon]);
            const isActive = activeLevel === key;
            return (
              React.createElement('button', {
                key: key,
                onClick: () => { setActiveLevel(key); setActiveCategory(allLabel); },
                className: `flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? key === "todos"
                      ? "bg-foreground text-background border-foreground"
                      : meta.color + " border-opacity-100"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`,
                'data-testid': `level-tab-${key}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}

                , Icon && React.createElement(Icon, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}} )
                , label
                , React.createElement('span', { className: "text-xs opacity-60 font-normal"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}, levelCounts[key])
              )
            );
          })
        )

        /* Search */
        , React.createElement('div', { className: "relative max-w-sm mb-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}
          , React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}} )
          , React.createElement(Input, { placeholder: l("Buscar prompt...", "Search prompt..."), value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9", 'data-testid': "input-search-prompts", __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}} )
        )

        /* Category filter */
        , React.createElement('div', { className: "flex flex-wrap gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}
          , categories.map((cat) => (
            React.createElement('button', {
              key: cat,
              onClick: () => setActiveCategory(cat),
              className: `text-xs rounded-full px-3 py-1.5 border transition-all duration-200 ${activeCategory === cat ? "bg-accent text-white border-accent" : "border-card-border text-muted-foreground hover:border-accent/50 hover:text-foreground"}`,
              'data-testid': `category-filter-${cat.toLowerCase().replace(/\s/g, "-")}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}

              , cat
            )
          ))
        )
      )

      /* Results */
      , React.createElement('div', { className: "grid md:grid-cols-2 gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 211}}
        , filtered.map((p, i) => {
          const id       = `${p.level}-${p.categoryEs}-${i}`;
          const title    = lang === "es" ? p.titleEs : p.titleEn;
          const category = lang === "es" ? p.categoryEs : p.categoryEn;
          const meta     = LEVEL_META[p.level];
          const Icon     = meta.icon;
          const levelLabel = lang === "es" ? meta.labelEs : meta.labelEn;
          return (
            React.createElement('div', { key: id, className: "bg-card border border-card-border rounded-xl p-5 flex flex-col gap-3"       , 'data-testid': `prompt-card-${i}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}
              , React.createElement('div', { className: "flex items-start justify-between gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}
                , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}}
                  , React.createElement('div', { className: "flex items-center gap-2 mb-2 flex-wrap"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 223}}
                    , React.createElement('span', { className: `inline-flex items-center gap-1 text-xs border rounded-full px-2.5 py-0.5 font-medium ${meta.color}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 224}}
                      , React.createElement(Icon, { className: "w-3 h-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}} )
                      , levelLabel
                    )
                    , React.createElement('span', { className: "text-xs bg-foreground/5 text-foreground/50 border border-border rounded-full px-2.5 py-0.5"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}, category)
                  )
                  , React.createElement('h3', { className: "font-medium text-sm leading-snug"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}, title)
                )
                , React.createElement('button', { onClick: () => handleCopy(p.prompt, id), className: "shrink-0 p-2 rounded-lg border border-card-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"        , 'data-testid': `btn-copy-${i}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}
                  , copied === id ? React.createElement(Check, { className: "w-4 h-4 text-green-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}} ) : React.createElement(Copy, { className: "w-4 h-4 text-muted-foreground"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}} )
                )
              )
              , React.createElement('p', { className: "text-xs text-muted-foreground leading-relaxed line-clamp-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}, p.prompt)
            )
          );
        })
      )

      , filtered.length === 0 && (
        React.createElement('div', { className: "text-center py-16 text-muted-foreground"  , 'data-testid': "no-prompts", __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}
          , React.createElement('p', { className: "font-serif text-xl mb-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}, l("Sin resultados", "No results"))
          , React.createElement('p', { className: "text-sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}, l("Prueba con otra búsqueda, nivel o categoría", "Try a different search, level or category"))
        )
      )
    )
  );
}
