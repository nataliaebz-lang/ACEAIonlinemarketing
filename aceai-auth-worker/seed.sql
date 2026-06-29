-- Datos de ejemplo para probar el panel. Bórralos cuando subas los recursos reales.
-- Ejecuta:  npx wrangler d1 execute aceai-resources --file=./seed.sql

INSERT INTO resources (type, area, level, link, image_url, title_es, title_en, title_pt, desc_es, desc_en, desc_pt, sort_order, active) VALUES
('course', 'abierto', 0, 'https://example.com/curso-bienvenida', NULL,
 'Bienvenida ACEAI', 'ACEAI Welcome', 'Boas-vindas ACEAI',
 'Tu primer paso dentro del círculo de fundadoras.', 'Your first step inside the founders circle.', 'Seu primeiro passo no círculo de fundadoras.',
 1, 1),

('book', 'P', 1, 'https://example.com/libro-proposito', NULL,
 'IA con propósito', 'AI with purpose', 'IA com propósito',
 'El manifiesto que guía cada decisión de negocio.', 'The manifesto guiding every business decision.', 'O manifesto que guia cada decisão de negócio.',
 1, 1),

('audio', 'IA', 2, 'https://example.com/audio-prompts', NULL,
 'Prompts que venden', 'Prompts that sell', 'Prompts que vendem',
 'Sesión de audio: cómo escribir prompts para marketing.', 'Audio session: writing prompts for marketing.', 'Sessão de áudio: escrever prompts para marketing.',
 1, 1),

('app', 'IA', 3, 'https://example.com/app-estudio', NULL,
 'Estudio de IA', 'AI Studio', 'Estúdio de IA',
 'Acceso a la app interna solo para niveles avanzados.', 'Access to the internal app for advanced levels only.', 'Acesso ao app interno apenas para níveis avançados.',
 1, 1);
