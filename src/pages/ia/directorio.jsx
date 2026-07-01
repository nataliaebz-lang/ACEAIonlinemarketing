import * as React from "react";
const _jsxFileName = ""; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useMemo } from "react";
import { ExternalLink, Search, List } from "lucide-react";
import { useLanguage } from "@/context/language";
import { SectionUpload } from "@/components/section-upload";








const TOOLS = [
  {"name":"AdCreative","url":"adcreative.ai","cat":"Publicidad / Anuncios con IA","group":"Marketing & SEO"},
  {"name":"Adobe Express","url":"adobe.com/express","cat":"Diseño gráfico","group":"Imagen & Diseño"},
  {"name":"Adobe Firefly","url":"firefly.adobe.com","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Adobe Illustrator Retype","url":"helpx.adobe.com/illustrator/using/retype.html","cat":"Diseño gráfico","group":"Imagen & Diseño"},
  {"name":"Adobe Max Keynote","url":"adobe.com/max","cat":"Diseño gráfico","group":"Imagen & Diseño"},
  {"name":"Adobe Podcast","url":"podcast.adobe.com","cat":"Audio / Podcast","group":"Audio & Voz"},
  {"name":"Adobe Premiere","url":"adobe.com/products/premiere.html","cat":"Edición de video","group":"Video & Avatares"},
  {"name":"Adobe Stock","url":"stock.adobe.com","cat":"Stock multimedia","group":"Imagen & Diseño"},
  {"name":"AI HomeDesign","url":"aihomedesign.com","cat":"Diseño de interiores","group":"Imagen & Diseño"},
  {"name":"AI-PRO","url":"ai-pro.org","cat":"Suite de herramientas IA","group":"Modelos LLM & IA"},
  {"name":"Air","url":"air.ai","cat":"Agentes de voz","group":"Audio & Voz"},
  {"name":"AKOOL","url":"akool.com","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"Alexa","url":"alexa.com","cat":"Asistente de voz","group":"Audio & Voz"},
  {"name":"Alli AI","url":"alliai.com","cat":"SEO","group":"Marketing & SEO"},
  {"name":"Altered Studio","url":"altered.ai","cat":"Cambio de voz","group":"Audio & Voz"},
  {"name":"Amelia","url":"amelia.ai","cat":"Chatbot / Atención al cliente","group":"Chatbots & Atención"},
  {"name":"AnswerThePublic","url":"answerthepublic.com","cat":"SEO / Palabras clave","group":"Marketing & SEO"},
  {"name":"Appy Pie Design","url":"appypie.com/design","cat":"Diseño gráfico","group":"Imagen & Diseño"},
  {"name":"Aragon","url":"aragon.ai","cat":"Retratos con IA","group":"Imagen & Diseño"},
  {"name":"Artlist","url":"artlist.io","cat":"Música y stock","group":"Audio & Voz"},
  {"name":"Asana AI","url":"asana.com/product/ai","cat":"Gestión de proyectos","group":"CRM & Ventas"},
  {"name":"Audials","url":"audials.com","cat":"Audio / Grabación","group":"Audio & Voz"},
  {"name":"BNSN AI","url":"bnsn.ai","cat":"Escritura / Copywriting","group":"Escritura & Contenido"},
  {"name":"Brandwatch","url":"brandwatch.com","cat":"Social listening","group":"Marketing & SEO"},
  {"name":"Bright Data","url":"brightdata.com/products/web-scraper","cat":"Web scraping","group":"Herramientas & Utilidades"},
  {"name":"Browse AI","url":"browse.ai","cat":"Web scraping / Automatización","group":"Automatización"},
  {"name":"Calendly","url":"calendly.com","cat":"Agendamiento","group":"Productividad"},
  {"name":"Camtasia","url":"techsmith.com/camtasia","cat":"Edición de video","group":"Video & Avatares"},
  {"name":"Canva","url":"canva.com","cat":"Diseño gráfico","group":"Imagen & Diseño"},
  {"name":"CapCut Voice Cloning","url":"capcut.com/resource/voice-cloning-free","cat":"Clonación de voz","group":"Audio & Voz"},
  {"name":"Captions","url":"captions.ai","cat":"Edición de video","group":"Video & Avatares"},
  {"name":"Cassidy","url":"cassidy.ai","cat":"Automatización IA","group":"Automatización"},
  {"name":"Circleboom","url":"circleboom.com","cat":"Redes sociales","group":"Marketing & SEO"},
  {"name":"Claid","url":"claid.ai","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"Claude (Anthropic)","url":"anthropic.com","cat":"Modelo LLM","group":"Modelos LLM & IA"},
  {"name":"ClickFunnels","url":"clickfunnels.com","cat":"Funnels / Landing pages","group":"Marketing & SEO"},
  {"name":"ClickUp","url":"clickup.com","cat":"Gestión de proyectos","group":"CRM & Ventas"},
  {"name":"Clio","url":"clio.com","cat":"Software legal","group":"Herramientas & Utilidades"},
  {"name":"Collov","url":"collov.ai","cat":"Diseño de interiores","group":"Imagen & Diseño"},
  {"name":"Colorbliss","url":"colorbliss.com","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Compliance.ai","url":"compliance.ai","cat":"Cumplimiento / Legal","group":"Herramientas & Utilidades"},
  {"name":"Coolors","url":"coolors.co","cat":"Paletas de color","group":"Imagen & Diseño"},
  {"name":"Copilot","url":"copilot.app","cat":"Atención al cliente","group":"Chatbots & Atención"},
  {"name":"CourseCreator360","url":"coursecreator360.com","cat":"Educación / Cursos","group":"Herramientas & Utilidades"},
  {"name":"Crawlq","url":"crawlq.ai","cat":"Marketing / Escritura","group":"Escritura & Contenido"},
  {"name":"Create","url":"create.net","cat":"Creación de sitios web","group":"Herramientas & Utilidades"},
  {"name":"D-ID","url":"d-id.com","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"DailyBot","url":"dailybot.com","cat":"Productividad / Automatización","group":"Automatización"},
  {"name":"Dante AI","url":"dante-ai.com","cat":"Chatbots","group":"Chatbots & Atención"},
  {"name":"Decisions","url":"decisions.com","cat":"Automatización de procesos","group":"Automatización"},
  {"name":"Decktopus","url":"decktopus.com","cat":"Presentaciones","group":"Herramientas & Utilidades"},
  {"name":"DeepBrain","url":"deepbrain.io","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"DeepMotion","url":"deepmotion.com","cat":"Captura de movimiento","group":"Video & Avatares"},
  {"name":"Descript","url":"descript.com","cat":"Edición de audio y video","group":"Video & Avatares"},
  {"name":"Designrr","url":"designrr.io","cat":"Creación de ebooks","group":"Escritura & Contenido"},
  {"name":"Designs.ai","url":"designs.ai","cat":"Diseño gráfico","group":"Imagen & Diseño"},
  {"name":"Dialpad","url":"dialpad.com","cat":"Comunicaciones / Voz","group":"Audio & Voz"},
  {"name":"DomoAI","url":"domoai.app","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Doodly","url":"voomly.com/doodly","cat":"Video whiteboard","group":"Video & Avatares"},
  {"name":"Durable AI","url":"durable.co","cat":"Creación de sitios web","group":"Herramientas & Utilidades"},
  {"name":"Dynamic Yield","url":"dynamicyield.com","cat":"Personalización / Marketing","group":"Marketing & SEO"},
  {"name":"Elai","url":"elai.io","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"ElevenLabs","url":"elevenlabs.io","cat":"Voz / Texto a voz","group":"Audio & Voz"},
  {"name":"ElevenLabs Sound Effects","url":"elevenlabs.io","cat":"Efectos de sonido","group":"Audio & Voz"},
  {"name":"EMO Research","url":"humanaigc.github.io/emote-portrait-alive","cat":"Animación de retratos","group":"Imagen & Diseño"},
  {"name":"Face Swapper AI","url":"faceswapper.ai","cat":"Face swap","group":"Imagen & Diseño"},
  {"name":"Falcon","url":"falconllm.tii.ae","cat":"Modelo LLM","group":"Modelos LLM & IA"},
  {"name":"FashionAI","url":"apps.chatbotkit.com/fashionai","cat":"Moda / IA","group":"Imagen & Diseño"},
  {"name":"Fathom","url":"fathom.video","cat":"Reuniones / Transcripción","group":"Productividad"},
  {"name":"Fireflies AI","url":"fireflies.ai","cat":"Reuniones / Transcripción","group":"Productividad"},
  {"name":"Flair","url":"flair.ai","cat":"Diseño de producto","group":"Imagen & Diseño"},
  {"name":"Flixier","url":"flixier.com","cat":"Edición de video","group":"Video & Avatares"},
  {"name":"Flux","url":"flux1.ai","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Fotor","url":"fotor.com","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"Fotorama AI","url":"fotorama.ai","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"Free Watermark Maker","url":"shutterstock.com/explore/watermark-maker","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"Freepik","url":"freepik.com","cat":"Stock multimedia","group":"Imagen & Diseño"},
  {"name":"Funnel","url":"funnel.io","cat":"Análisis de marketing","group":"Marketing & SEO"},
  {"name":"Gamma","url":"gamma.app","cat":"Presentaciones","group":"Herramientas & Utilidades"},
  {"name":"Gemini","url":"gemini.google.com","cat":"Modelo LLM","group":"Modelos LLM & IA"},
  {"name":"Generated Photos","url":"generated.photos","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Genny by LOVO","url":"genny.lovo.ai","cat":"Voz / Texto a voz","group":"Audio & Voz"},
  {"name":"Glasp","url":"glasp.co","cat":"Notas y resúmenes","group":"Productividad"},
  {"name":"Gling","url":"gling.ai","cat":"Edición de video","group":"Video & Avatares"},
  {"name":"Gmail Smart Reply","url":"blog.google/products/gmail","cat":"Email / Productividad","group":"Marketing & SEO"},
  {"name":"GoHighLevel","url":"gohighlevel.com","cat":"CRM / Marketing","group":"Marketing & SEO"},
  {"name":"Google Project Astra","url":"deepmind.google/technologies/gemini/project-astra","cat":"Asistente IA multimodal","group":"Modelos LLM & IA"},
  {"name":"GPT Store AI","url":"gptstore.ai","cat":"Directorio / GPTs","group":"Herramientas & Utilidades"},
  {"name":"Grain","url":"grain.com","cat":"Reuniones / Transcripción","group":"Productividad"},
  {"name":"Grammarly","url":"grammarly.com","cat":"Escritura / Corrección","group":"Escritura & Contenido"},
  {"name":"Groove","url":"groove.cm","cat":"Marketing / Funnels","group":"Marketing & SEO"},
  {"name":"Hedra","url":"hedra.com","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"HeyGen","url":"heygen.com","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"Higgsfield AI","url":"higgsfield.ai","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"HitPaw","url":"hitpaw.com","cat":"Edición de video y audio","group":"Video & Avatares"},
  {"name":"HomeDesignsAI","url":"homedesigns.ai","cat":"Diseño de interiores","group":"Imagen & Diseño"},
  {"name":"Hootsuite","url":"hootsuite.com","cat":"Gestión de redes sociales","group":"Marketing & SEO"},
  {"name":"Hostinger","url":"hostinger.com","cat":"Hosting / Sitios web","group":"Herramientas & Utilidades"},
  {"name":"Human Generator","url":"humangenerator.io","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Hunter","url":"hunter.io","cat":"Email / Prospección","group":"Marketing & SEO"},
  {"name":"HyperWrite","url":"hyperwriteai.com","cat":"Escritura / Copywriting","group":"Escritura & Contenido"},
  {"name":"Ideogram","url":"ideogram.ai","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"ImagineMe","url":"imagine.me","cat":"Generación de imágenes / Avatares","group":"Imagen & Diseño"},
  {"name":"InPixio","url":"inpixio.com","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"Invideo AI","url":"invideo.ai","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Jasper","url":"jasper.ai","cat":"Escritura / Copywriting","group":"Escritura & Contenido"},
  {"name":"Jenni AI","url":"jenni.ai","cat":"Escritura académica","group":"Escritura & Contenido"},
  {"name":"Jotform","url":"jotform.com","cat":"Formularios / Encuestas","group":"Herramientas & Utilidades"},
  {"name":"Justdone","url":"justdone.ai","cat":"Escritura / Copywriting","group":"Escritura & Contenido"},
  {"name":"Kaiber","url":"kaiber.ai","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Karaoke Version","url":"karaoke-version.com","cat":"Audio / Música","group":"Audio & Voz"},
  {"name":"Keap","url":"keap.com","cat":"CRM / Automatización","group":"Automatización"},
  {"name":"Kittl","url":"kittl.com","cat":"Diseño gráfico","group":"Imagen & Diseño"},
  {"name":"Klap","url":"klap.app","cat":"Edición de video / Clips","group":"Video & Avatares"},
  {"name":"KlearStack","url":"klearstack.com","cat":"Procesamiento de documentos","group":"Herramientas & Utilidades"},
  {"name":"Kling","url":"kling.ai","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Krea","url":"krea.ai","cat":"Generación de imágenes y video","group":"Video & Avatares"},
  {"name":"Kroma.ai","url":"kroma.ai","cat":"Stock multimedia","group":"Imagen & Diseño"},
  {"name":"Kudo","url":"kudoway.com","cat":"Traducción / Interpretación","group":"Herramientas & Utilidades"},
  {"name":"LALAL AI","url":"lalal.ai","cat":"Separación de pistas","group":"Audio & Voz"},
  {"name":"Landbot","url":"landbot.io","cat":"Chatbots","group":"Chatbots & Atención"},
  {"name":"Landingi","url":"landingi.com","cat":"Landing pages","group":"Marketing & SEO"},
  {"name":"LeadPages","url":"leadpages.com","cat":"Landing pages","group":"Marketing & SEO"},
  {"name":"Lensa","url":"lensa.app","cat":"Edición de imágenes / Avatares","group":"Imagen & Diseño"},
  {"name":"Leonardo.ai","url":"leonardo.ai","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Letsky","url":"reface.ai/letsy","cat":"Face swap","group":"Imagen & Diseño"},
  {"name":"Listnr","url":"listnr.ai","cat":"Voz / Texto a voz","group":"Audio & Voz"},
  {"name":"LivePerson","url":"liveperson.com","cat":"Chatbots / Atención al cliente","group":"Chatbots & Atención"},
  {"name":"Llama (Meta)","url":"llama.com","cat":"Modelo LLM","group":"Modelos LLM & IA"},
  {"name":"Looka","url":"looka.com","cat":"Logos / Marca","group":"Imagen & Diseño"},
  {"name":"Loudly","url":"loudly.com","cat":"Audio / Música","group":"Audio & Voz"},
  {"name":"Lucidchart","url":"lucidchart.com","cat":"Diagramas / Productividad","group":"Productividad"},
  {"name":"Luminar Neo","url":"skylum.com/luminar","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"Mage Space","url":"mage.space","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"MagicSlides App","url":"workspace.google.com/marketplace/app/magicslides","cat":"Presentaciones","group":"Herramientas & Utilidades"},
  {"name":"Magnific AI","url":"magnific.ai","cat":"Upscaling de imágenes","group":"Imagen & Diseño"},
  {"name":"Make","url":"make.com","cat":"Automatización / No-code","group":"Automatización"},
  {"name":"Manychat","url":"manychat.com","cat":"Chatbots / Marketing","group":"Marketing & SEO"},
  {"name":"MaxAI.me","url":"maxai.me","cat":"Asistente IA","group":"Modelos LLM & IA"},
  {"name":"Merlin AI","url":"getmerlin.in","cat":"Asistente IA / Extensión","group":"Modelos LLM & IA"},
  {"name":"Microsoft Power Automate","url":"microsoft.com/power-platform/products/power-automate","cat":"Automatización","group":"Automatización"},
  {"name":"Midjourney","url":"midjourney.com","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Millis AI","url":"millis.ai","cat":"Agentes de voz","group":"Audio & Voz"},
  {"name":"Miro","url":"miro.com","cat":"Pizarra colaborativa","group":"Productividad"},
  {"name":"Mistral","url":"mistral.ai","cat":"Modelo LLM","group":"Modelos LLM & IA"},
  {"name":"Monday AI","url":"monday.com","cat":"Gestión de proyectos","group":"CRM & Ventas"},
  {"name":"Motion","url":"usemotion.com","cat":"Productividad / Agenda","group":"Productividad"},
  {"name":"Ms Office Clutter","url":"support.microsoft.com","cat":"Email / Productividad","group":"Marketing & SEO"},
  {"name":"Munch","url":"getmunch.com","cat":"Edición de video / Clips","group":"Video & Avatares"},
  {"name":"Murf AI","url":"murf.ai","cat":"Voz / Texto a voz","group":"Audio & Voz"},
  {"name":"MyHeritage","url":"myheritage.com","cat":"Genealogía / ADN","group":"Herramientas & Utilidades"},
  {"name":"Neural Frames","url":"neuralframes.com","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"NeuroFlash","url":"neuro-flash.com","cat":"Escritura / Copywriting","group":"Escritura & Contenido"},
  {"name":"Nice","url":"nice.com","cat":"Contact center","group":"Chatbots & Atención"},
  {"name":"NotebookLM","url":"notebooklm.google.com","cat":"Investigación / Notas","group":"Productividad"},
  {"name":"NVIDIA Broadcast","url":"nvidia.com/geforce/broadcasting","cat":"Video / Streaming","group":"Video & Avatares"},
  {"name":"Ontraport","url":"ontraport.com","cat":"CRM / Automatización","group":"Automatización"},
  {"name":"OpenArt","url":"openart.ai","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"Otter","url":"otter.ai","cat":"Reuniones / Transcripción","group":"Productividad"},
  {"name":"PagePilot","url":"pagepilot.ai","cat":"Landing pages / E-commerce","group":"Marketing & SEO"},
  {"name":"Pathmonk","url":"pathmonk.com","cat":"Marketing / Conversión","group":"Marketing & SEO"},
  {"name":"PDFGPT","url":"pdfgpt.io","cat":"Chat con PDF","group":"Herramientas & Utilidades"},
  {"name":"Pexels","url":"pexels.com","cat":"Stock multimedia","group":"Imagen & Diseño"},
  {"name":"Pictory","url":"pictory.ai","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Pika Labs","url":"pika.art","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Piktochart","url":"piktochart.com","cat":"Diseño / Infografías","group":"Imagen & Diseño"},
  {"name":"PimEyes","url":"pimeyes.com","cat":"Reconocimiento facial","group":"Herramientas & Utilidades"},
  {"name":"Pixelcut","url":"pixelcut.ai","cat":"Imágenes de producto","group":"CRM & Ventas"},
  {"name":"Pixlr E","url":"pixlr.com/editor","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"Pixverse","url":"app.pixverse.ai","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"PlayHt","url":"play.ht","cat":"Voz / Texto a voz","group":"Audio & Voz"},
  {"name":"Predis","url":"predis.ai","cat":"Redes sociales / Contenido","group":"Marketing & SEO"},
  {"name":"Presentations.ai","url":"presentations.ai","cat":"Presentaciones","group":"Herramientas & Utilidades"},
  {"name":"Prezi","url":"prezi.com","cat":"Presentaciones","group":"Herramientas & Utilidades"},
  {"name":"Prisma Labs","url":"prisma-ai.com","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"ProductScope","url":"productscope.ai","cat":"E-commerce / Producto","group":"CRM & Ventas"},
  {"name":"PromptHero","url":"prompthero.com","cat":"Prompts / Comunidad","group":"Herramientas & Utilidades"},
  {"name":"QuillBot","url":"quillbot.com","cat":"Escritura / Parafraseo","group":"Escritura & Contenido"},
  {"name":"Rask","url":"rask.ai","cat":"Traducción / Doblaje de video","group":"Video & Avatares"},
  {"name":"Reclaim","url":"reclaim.ai","cat":"Productividad / Agenda","group":"Productividad"},
  {"name":"Removebg","url":"remove.bg","cat":"Eliminación de fondo","group":"Imagen & Diseño"},
  {"name":"RenderNet","url":"rendernet.ai","cat":"Generación de imágenes","group":"Imagen & Diseño"},
  {"name":"RescueTime","url":"rescuetime.com","cat":"Seguimiento de tiempo","group":"Productividad"},
  {"name":"Resistant AI","url":"resistant.ai","cat":"Antifraude / Seguridad","group":"Herramientas & Utilidades"},
  {"name":"Riverside.fm","url":"riverside.fm","cat":"Grabación de audio y video","group":"Video & Avatares"},
  {"name":"Rows","url":"rows.com","cat":"Hojas de cálculo / Datos","group":"Productividad"},
  {"name":"Runway ML","url":"runwayml.com","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"RunwayML Gen-3","url":"runwayml.com/ai-tools/gen-3-alpha","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"SaneBox","url":"sanebox.com","cat":"Email / Productividad","group":"Marketing & SEO"},
  {"name":"ScoreApp","url":"scoreapp.com","cat":"Marketing / Quizzes","group":"Marketing & SEO"},
  {"name":"ScrapingAnt","url":"scrapingant.com","cat":"Web scraping","group":"Herramientas & Utilidades"},
  {"name":"Scraping Solutions","url":"scrapingsolutions.com.au","cat":"Web scraping","group":"Herramientas & Utilidades"},
  {"name":"Scribe","url":"scribehow.com","cat":"Documentación / Guías","group":"Escritura & Contenido"},
  {"name":"Semrush","url":"semrush.com","cat":"SEO / Marketing","group":"Marketing & SEO"},
  {"name":"Shazam","url":"shazam.com","cat":"Reconocimiento musical","group":"Audio & Voz"},
  {"name":"Shopify","url":"shopify.com","cat":"E-commerce","group":"CRM & Ventas"},
  {"name":"Siri","url":"apple.com/siri","cat":"Asistente de voz","group":"Audio & Voz"},
  {"name":"Siro","url":"siro.ai","cat":"Ventas / Coaching de llamadas","group":"CRM & Ventas"},
  {"name":"Sitekick","url":"sitekick.ai","cat":"Landing pages","group":"Marketing & SEO"},
  {"name":"SlidesAI.io","url":"slidesai.io","cat":"Presentaciones","group":"Herramientas & Utilidades"},
  {"name":"SlideUplift","url":"slideuplift.com","cat":"Presentaciones / Plantillas","group":"Herramientas & Utilidades"},
  {"name":"Smashing Logo","url":"smashinglogo.com","cat":"Logos / Marca","group":"Imagen & Diseño"},
  {"name":"Soundful","url":"soundful.com","cat":"Audio / Música","group":"Audio & Voz"},
  {"name":"Soundraw","url":"soundraw.io","cat":"Audio / Música","group":"Audio & Voz"},
  {"name":"Soundry AI","url":"soundry.ai","cat":"Audio / Música","group":"Audio & Voz"},
  {"name":"Soundverse","url":"soundverse.ai","cat":"Audio / Música","group":"Audio & Voz"},
  {"name":"Speak to ChatGPT","url":"microsoftedge.microsoft.com/addons","cat":"Asistente de voz","group":"Audio & Voz"},
  {"name":"Speechify","url":"speechify.com","cat":"Voz / Texto a voz","group":"Audio & Voz"},
  {"name":"Spiritme","url":"spiritme.tech","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"Stability","url":"stability.ai","cat":"Modelo de imágenes","group":"Modelos LLM & IA"},
  {"name":"Submagic","url":"submagic.co","cat":"Subtítulos de video","group":"Video & Avatares"},
  {"name":"SurveyMonkey","url":"surveymonkey.com","cat":"Encuestas / Formularios","group":"Herramientas & Utilidades"},
  {"name":"Swipe File","url":"swipefiles.com","cat":"Marketing / Recursos","group":"Marketing & SEO"},
  {"name":"Synthesia","url":"synthesia.io","cat":"Avatares / Video","group":"Video & Avatares"},
  {"name":"Synthflow","url":"synthflow.ai","cat":"Agentes de voz","group":"Audio & Voz"},
  {"name":"Taskade","url":"taskade.com","cat":"Gestión de tareas","group":"Productividad"},
  {"name":"Tavus","url":"tavus.io","cat":"Avatares / Video personalizado","group":"Video & Avatares"},
  {"name":"Todoist","url":"todoist.com","cat":"Gestión de tareas","group":"Productividad"},
  {"name":"Toggl","url":"toggl.com","cat":"Seguimiento de tiempo","group":"Productividad"},
  {"name":"Trello","url":"trello.com","cat":"Gestión de proyectos","group":"CRM & Ventas"},
  {"name":"Twilio","url":"twilio.com","cat":"Comunicaciones / API","group":"Herramientas & Utilidades"},
  {"name":"UiPath","url":"uipath.com","cat":"Automatización / RPA","group":"Automatización"},
  {"name":"Unbabel","url":"unbabel.com","cat":"Traducción","group":"Herramientas & Utilidades"},
  {"name":"Unbounce","url":"unbounce.com","cat":"Landing pages / Conversión","group":"Marketing & SEO"},
  {"name":"Uncody","url":"uncody.com","cat":"Creación de sitios web","group":"Herramientas & Utilidades"},
  {"name":"Vectoriser AI","url":"vectorizer.ai","cat":"Diseño / Vectorización","group":"Imagen & Diseño"},
  {"name":"Veed Eye Contact","url":"veed.io/eye-contact","cat":"Edición de video","group":"Video & Avatares"},
  {"name":"Venturekit AI","url":"venturekit.ai","cat":"Planes de negocio","group":"CRM & Ventas"},
  {"name":"Vida","url":"vida.io","cat":"Audio / Podcast","group":"Audio & Voz"},
  {"name":"Vidalytics","url":"vidalytics.com","cat":"Video / Analítica","group":"Video & Avatares"},
  {"name":"Videobolt","url":"videobolt.net","cat":"Edición de video / Plantillas","group":"Video & Avatares"},
  {"name":"Vidu","url":"vidu.com","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Viggle AI","url":"viggle.ai","cat":"Generación de video","group":"Video & Avatares"},
  {"name":"Voice AI","url":"voice.ai","cat":"Cambio de voz","group":"Audio & Voz"},
  {"name":"Warmly","url":"warmly.ai","cat":"Ventas / Intención de compra","group":"CRM & Ventas"},
  {"name":"Watermark Remover","url":"watermarkremover.io","cat":"Edición de imágenes","group":"Imagen & Diseño"},
  {"name":"WellSaid","url":"wellsaidlabs.com","cat":"Voz / Texto a voz","group":"Audio & Voz"},
  {"name":"Wix","url":"wix.com","cat":"Creación de sitios web","group":"Herramientas & Utilidades"},
  {"name":"Wondershare Filmora","url":"filmora.wondershare.com","cat":"Edición de video","group":"Video & Avatares"},
  {"name":"Wondershare UniConverter","url":"videoconverter.wondershare.com","cat":"Conversión de video","group":"Video & Avatares"},
  {"name":"Wordly","url":"wordly.ai","cat":"Traducción / Interpretación","group":"Herramientas & Utilidades"},
  {"name":"XMind AI","url":"xmind.ai","cat":"Mapas mentales","group":"Productividad"},
  {"name":"You","url":"you.com","cat":"Buscador / Asistente IA","group":"Modelos LLM & IA"},
  {"name":"YouCam","url":"yce.perfectcorp.com","cat":"Edición de imágenes / Belleza","group":"Imagen & Diseño"},
  {"name":"YouTube Studio","url":"youtube.com","cat":"Plataforma de video","group":"Video & Avatares"},
  {"name":"Zapier","url":"zapier.com","cat":"Automatización / No-code","group":"Automatización"},
];

const GROUP_META = {
  "Imagen & Diseño":           { dot: "bg-violet-500",  color: "bg-violet-50 text-violet-700 border-violet-200",  activeChip: "bg-violet-100 text-violet-800 border-violet-300" },
  "Video & Avatares":          { dot: "bg-red-500",     color: "bg-red-50 text-red-700 border-red-200",            activeChip: "bg-red-100 text-red-800 border-red-300" },
  "Audio & Voz":               { dot: "bg-rose-500",    color: "bg-rose-50 text-rose-700 border-rose-200",         activeChip: "bg-rose-100 text-rose-800 border-rose-300" },
  "Escritura & Contenido":     { dot: "bg-amber-500",   color: "bg-amber-50 text-amber-700 border-amber-200",      activeChip: "bg-amber-100 text-amber-800 border-amber-300" },
  "Marketing & SEO":           { dot: "bg-orange-500",  color: "bg-orange-50 text-orange-700 border-orange-200",   activeChip: "bg-orange-100 text-orange-800 border-orange-300" },
  "Automatización":            { dot: "bg-cyan-500",    color: "bg-cyan-50 text-cyan-700 border-cyan-200",         activeChip: "bg-cyan-100 text-cyan-800 border-cyan-300" },
  "Chatbots & Atención":       { dot: "bg-teal-500",    color: "bg-teal-50 text-teal-700 border-teal-200",         activeChip: "bg-teal-100 text-teal-800 border-teal-300" },
  "Modelos LLM & IA":          { dot: "bg-indigo-500",  color: "bg-indigo-50 text-indigo-700 border-indigo-200",   activeChip: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  "Productividad":             { dot: "bg-green-500",   color: "bg-green-50 text-green-700 border-green-200",      activeChip: "bg-green-100 text-green-800 border-green-300" },
  "CRM & Ventas":              { dot: "bg-pink-500",    color: "bg-pink-50 text-pink-700 border-pink-200",         activeChip: "bg-pink-100 text-pink-800 border-pink-300" },
  "Herramientas & Utilidades": { dot: "bg-slate-400",   color: "bg-slate-50 text-slate-600 border-slate-200",      activeChip: "bg-slate-100 text-slate-700 border-slate-300" },
};

const ALL_GROUPS = Object.keys(GROUP_META);

export default function DirectorioIA() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("Todas");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return TOOLS.filter((t) => {
      const matchGroup = activeGroup === "Todas" || t.group === activeGroup;
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q) || t.group.toLowerCase().includes(q);
      return matchGroup && matchSearch;
    });
  }, [search, activeGroup]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((t) => {
      if (!map[t.group]) map[t.group] = [];
      map[t.group].push(t);
    });
    return map;
  }, [filtered]);

  const groupsToShow = ALL_GROUPS.filter((g) => _optionalChain([grouped, 'access', _ => _[g], 'optionalAccess', _2 => _2.length]));

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "directorio-ia", __self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}
      , React.createElement(SectionUpload, { route: "/ia/directorio" })
      /* Header */
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}
        , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 308}}
          , React.createElement(List, { className: "w-4 h-4 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 309}} )
          , React.createElement('span', { className: "text-xs uppercase tracking-[0.25em] text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}
            , l("IA · Directorio", "AI · Directory")
          )
        )
        , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 314}}
          , l("Directorio de Herramientas IA", "AI Tools Directory")
        )
        , React.createElement('p', { className: "text-muted-foreground max-w-xl leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 317}}
          , l(
            `${TOOLS.length} herramientas organizadas en 11 categorías. Haz clic en cualquier tarjeta para visitar el sitio.`,
            `${TOOLS.length} tools organised across 11 categories. Click any card to visit the site.`
          )
        )
      )

      /* Search */
      , React.createElement('div', { className: "relative max-w-md mb-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 326}}
        , React.createElement(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 327}} )
        , React.createElement('input', {
          type: "text",
          placeholder: l("Buscar herramienta o categoría…", "Search tool or category…"),
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 328}}
        )
      )

      /* Category chips */
      , React.createElement('div', { className: "flex flex-wrap gap-2 mb-7"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 338}}
        , React.createElement('button', {
          onClick: () => setActiveGroup("Todas"),
          className: `text-xs font-semibold rounded-full px-4 py-1.5 border-0 transition-all ${
            activeGroup === "Todas"
              ? "bg-primary text-white shadow-[0_4px_14px_hsl(353_100%_48%_/_0.40)]"
              : "bg-primary/75 text-white hover:bg-primary"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 339}}

          , l("Todas", "All"), " (" , TOOLS.length, ")"
        )
        , ALL_GROUPS.map((g) => {
          const active = activeGroup === g;
          const count = TOOLS.filter(t => t.group === g).length;
          return (
            React.createElement('button', {
              key: g,
              onClick: () => setActiveGroup(g),
              className: `inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-4 py-1.5 border-0 transition-all ${
                active
                  ? "bg-primary text-white shadow-[0_4px_14px_hsl(353_100%_48%_/_0.40)]"
                  : "bg-primary/75 text-white hover:bg-primary"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 353}}

              , g
              , React.createElement('span', { className: "opacity-70", __self: this, __source: {fileName: _jsxFileName, lineNumber: 363}}, "(", count, ")")
            )
          );
        })
      )

      /* Count */
      , React.createElement('p', { className: "text-xs text-muted-foreground mb-8"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 370}}
        , filtered.length, " " , l("herramienta(s) encontrada(s)", "tool(s) found")
      )

      /* Groups */
      , groupsToShow.length === 0 ? (
        React.createElement('div', { className: "text-center py-20 text-muted-foreground text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 376}}
          , l("Sin resultados para tu búsqueda.", "No results for your search.")
        )
      ) : (
        React.createElement('div', { className: "space-y-14", __self: this, __source: {fileName: _jsxFileName, lineNumber: 380}}
          , groupsToShow.map((group) => {
            const meta = GROUP_META[group];
            const tools = grouped[group];
            return (
              React.createElement('section', { key: group, __self: this, __source: {fileName: _jsxFileName, lineNumber: 385}}
                , React.createElement('div', { className: "flex items-center gap-2.5 mb-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 386}}
                  , React.createElement('span', { className: `w-2.5 h-2.5 rounded-full shrink-0 ${meta.dot}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 387}} )
                  , React.createElement('h2', { className: "font-serif text-2xl font-light"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 388}}, group)
                  , React.createElement('span', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 389}}, "(", tools.length, ")")
                )
                , React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 391}}
                  , tools.map((tool) => (
                    React.createElement('a', {
                      key: tool.name + tool.url,
                      href: `https://${tool.url}`,
                      target: "_blank",
                      rel: "noopener noreferrer" ,
                      className: "group flex flex-col gap-2.5 rounded-xl border border-border bg-white/70 p-4 hover:border-primary/25 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 393}}

                      , React.createElement('div', { className: "flex items-start justify-between gap-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 400}}
                        , React.createElement('div', { className: "w-8 h-8 rounded-lg overflow-hidden bg-muted/60 flex items-center justify-center shrink-0 border border-border/50"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 401}}
                          , React.createElement('img', {
                            src: `https://www.google.com/s2/favicons?sz=32&domain_url=${tool.url}`,
                            alt: "",
                            className: "w-5 h-5 object-contain"  ,
                            loading: "lazy",
                            onError: (e) => { (e.target ).style.display = "none"; }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 402}}
                          )
                        )
                        , React.createElement(ExternalLink, { className: "w-3 h-3 text-muted-foreground/30 group-hover:text-primary/50 transition-colors shrink-0 mt-0.5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 410}} )
                      )
                      , React.createElement('p', { className: "text-sm font-medium text-foreground leading-tight line-clamp-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 412}}, tool.name)
                      , React.createElement('span', { className: `self-start text-[9px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 border ${meta.color}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 413}}
                        , tool.cat
                      )
                    )
                  ))
                )
              )
            );
          })
        )
      )
    )
  );
}
